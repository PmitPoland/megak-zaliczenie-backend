import {forwardRef, Module} from '@nestjs/common';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {ToolModule} from "../tool/tool.module";

@Module({
  imports: [
    forwardRef(() => ToolModule),
    forwardRef(() => UserModule),
    //    forwardRef(() => MailModule),
  ],
  controllers: [RentController],
  providers: [RentService],
  exports: [RentService]
})
export class RentModule {}
