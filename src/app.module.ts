import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {configDatabase} from "./database/config";
import { UserModule } from './user/user.module';
import { ToolModule } from './tool/tool.module';
import {ToolController} from "./tool/tool.controller";
import {ToolService} from "./tool/tool.service";
import {UserService} from "./user/user.service";
import { RentModule } from './rent/rent.module';
import {UserController} from "./user/user.controller";



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configDatabase.dbHost,
      port: 3306,
      username: configDatabase.dbUser,
      password: configDatabase.dbPassword,
      database: configDatabase.dbDatabase,
      entities: ["dist/**/**.entity{.ts,.js}"],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    UserModule,
    ToolModule,
    RentModule
  ],
  controllers: [AppController, ToolController, UserController],
  providers: [AppService],
})
export class AppModule {}
