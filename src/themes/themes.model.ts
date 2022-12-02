import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Answers

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop()
  text: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);

// Questions

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop()
  text: string;

  @Prop({ type: AnswerSchema })
  rightAnswer: Answer;

  @Prop({ type: [AnswerSchema], default: [] })
  wrongAnswers: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

// Themes

export type ThemeDocument = HydratedDocument<Theme>;

@Schema()
export class Theme {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop()
  name: string;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];
  // array of Questions
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
