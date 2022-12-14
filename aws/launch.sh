#!/bin/bash -e

# usage: launch.sh <base-name> <aws-keypair-name>
# default value for base-name is "SOA-CA2"
# default value for aws-keypair-name is "MAIN_KEY"

C="\033[1;32m"
R="\033[0m"

# usage function
usage() {
    echo "usage: launch.sh <base-name> <aws-keypair-name>"
    echo "  defaults: base-name=SOA-CA2, aws-keypair-name=MAIN_KEY"
}

# check for correct number of arguments
if [ $# -gt 2 ]; then
    usage
    exit 1
fi

if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    usage
    exit 0
fi

BASE_NAME=${1:-FULLREMOTE}
AWS_KEYPAIR_NAME=${2:-MAIN_KEY}

STACK_NAME="${BASE_NAME}-Stack"

# check if stack exists with list-stacks and jq
STACK_EXISTS=$(aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE --query "StackSummaries[?StackName=='$STACK_NAME'].StackName" --output text)

if [ ! -z $STACK_EXISTS ]; then
    echo "Stack $STACK_NAME already exists!"
    exit 1
fi

# Ask confirmation
echo -e "This will create a stack named $C${STACK_NAME}$R in AWS."
echo -e "It will use the keypair named $C${AWS_KEYPAIR_NAME}$R."

read -p "Are you sure? (y/N) " -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi


spinner()
{
    local pid=$1
    local delay=0.75
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

echo "Creating stack $STACK_NAME"
STACK_ARN=$(aws cloudformation create-stack \
  --stack-name "$STACK_NAME" \
  --template-body file://vpc.yml \
  --parameters ParameterKey=BaseName,ParameterValue="${BASE_NAME//-/_}" \
               ParameterKey=KeyName,ParameterValue="$AWS_KEYPAIR_NAME" \
  | jq -r '.StackId')

# trim and store
echo "$STACK_ARN" | xargs > "./stack_arn.txt"

echo -n "Waiting for stack to be created "
aws cloudformation wait stack-create-complete --stack-name $STACK_ARN & spinner $!
echo

VPC_IP=$(aws cloudformation describe-stacks --stack-name $STACK_ARN --query "Stacks[0].Outputs[?OutputKey=='PublicIp'].OutputValue" --output text)

echo "VPC IP: $VPC_IP"
echo "You can connect to the VPC with: ssh -i ~/.ssh/YOU_PRIVATE_KEY.pem ec2-user@$VPC_IP"
