import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {RentModule} from "../rent/rent.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([UserEntity]),
      forwardRef(() => RentModule),
      forwardRef(() => UserModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
