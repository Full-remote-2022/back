export class NewAnswerDto {
  text: string;
}

export class NewQuestionDto {
  text: string;
  rightAnswer: NewAnswerDto;
  wrongAnswers: NewAnswerDto[];
}

export class NewThemeDto {
  name: string;
  questions: NewQuestionDto[];
}
