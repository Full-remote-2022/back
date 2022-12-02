import { Module } from "@nestjs/common";
import { ThemesService } from "./themes.service";
import { ThemesController } from "./themes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Theme, ThemeSchema } from "./themes.model";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Theme.name,
      schema: ThemeSchema,
    }]),
  ],
  providers: [ThemesService],
  controllers: [ThemesController],
})
export class ThemesModule {}
