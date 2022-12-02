import { ApiProperty } from "@nestjs/swagger";
import { Schema } from "mongoose";

export class UserDto {
  readonly _id: string;
  readonly username: string;
}
