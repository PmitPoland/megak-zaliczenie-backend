import {forwardRef, Module} from '@nestjs/common';
import { ToolController } from './tool.controller';
import { ToolService } from './tool.service';
import {UserModule} from "../user/user.module";
import {RentModule} from "../rent/rent.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ToolEntity} from "./tool.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([ToolEntity]),
    forwardRef(() => RentModule),
    forwardRef(() => RentModule),
    forwardRef(() => UserModule)],
  controllers: [ToolController],
  providers: [ToolService],
  exports: [ToolService]
})
export class ToolModule {}
