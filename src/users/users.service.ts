import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const exists = await this.userModel.exists({ username }).exec();
    if (exists) {
      throw new ForbiddenException("User already exists");
    }
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }

  async getUser(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user === null) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
