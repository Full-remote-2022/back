import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

import config from "./config/configuration";
import { ThemesModule } from "./themes/themes.module";

@Module({
  imports: [
    // .env
    ConfigModule.forRoot({
      load: [config],
    }),
    // MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.getOrThrow<string>("dbUri"),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ThemesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
