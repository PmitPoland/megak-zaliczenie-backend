import {forwardRef, Module} from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import {UserModule} from "../user/user.module";
import {ToolModule} from "../tool/tool.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RentEntity} from "./rent.entity";
import {UserEntity} from "../user/user.entity";
import {ToolEntity} from "../tool/tool.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([RentEntity, UserEntity, ToolEntity]),
    forwardRef(() => ToolModule),
    forwardRef(() => UserModule),
    //    forwardRef(() => MailModule),
  ],
  controllers: [RentController],
  providers: [RentService],
  exports: [RentService]
})
export class RentModule {}
