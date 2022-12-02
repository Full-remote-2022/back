import { Body, Controller, Get, Post } from "@nestjs/common";
import { NewThemeDto } from "./dto/new-theme.dto";
import { ThemeDto } from "./dto/theme.dto";
import { Question } from "./themes.model";
import { ThemesService } from "./themes.service";

@Controller("themes")
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  async createTheme(@Body() theme: NewThemeDto): Promise<ThemeDto> {
    const newTheme = await this.themesService.createTheme(theme);
    return {
      name: newTheme.name,
      _id: newTheme._id,
      questions: newTheme.questions.map(this.questioToDto),
    };
  }

  @Get()
  async getAll(): Promise<ThemeDto[]> {
    const themes = await this.themesService.getThemes();
    return themes.map((theme) => ({
      name: theme.name,
      _id: theme._id,
      questions: theme.questions.map(this.questioToDto),
    }));
  }

  private questioToDto = (question: Question) => ({
    _id: question._id.toString(),
    text: question.text,
    answers: [question.rightAnswer, ...question.wrongAnswers],
  });
}
