import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewThemeDto } from "./dto/new-theme.dto";
import { Theme, ThemeDocument } from "./themes.model";

@Injectable()
export class ThemesService {
  constructor(
    @InjectModel(Theme.name) private readonly themeModel: Model<ThemeDocument>,
  ) {}

  async getThemes(): Promise<ThemeDocument[]> {
    return this.themeModel.find().exec();
  }

  async getTheme(name: string): Promise<Theme> {
    const theme = this.themeModel.findOne({ name }).exec();
    if (theme === null) {
      throw new NotFoundException("Theme not found");
    }
    return theme;
  }

  async createTheme(theme: NewThemeDto): Promise<Theme> {
    const exists = await this.themeModel.exists({ name: theme.name }).exec();
    if (exists) {
      throw new ForbiddenException("Theme already exists");
    }
    const newTheme = await this.themeModel.create(theme);
    return newTheme;
  }
}
