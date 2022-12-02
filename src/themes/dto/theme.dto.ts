export class AnswerDto {
  _id: string;
  text: string;
}

export class QuestionDto {
  _id: string;
  text: string;
  answers: AnswerDto[];
}

export class ThemeDto {
  _id: string;
  name: string;
  questions: QuestionDto[];
}
