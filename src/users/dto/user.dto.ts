import { ApiProperty } from "@nestjs/swagger";
import { Schema } from "mongoose";

export class UserDto {
  @ApiProperty()
  readonly id: Schema.Types.ObjectId;
  @ApiProperty()
  readonly username: string;
}
