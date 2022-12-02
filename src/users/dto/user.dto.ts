import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  readonly username: string;
}
