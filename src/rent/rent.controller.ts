import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Post} from '@nestjs/common';
import {NewRentDto} from "./dto/new-rent.dto";
import {RentService} from "./rent.service";
import {RemoveWypozyczenieResponse} from "../interface/rent";

@Controller('rent')
export class RentController {

    constructor(
        @Inject(forwardRef(() => RentService)) private rentService: RentService,
    ) {}

    @Post('/add')
    noweWypozyczenie(
        @Body() rentUserToolWController: NewRentDto,   // Dzięki Body możemy odbierać dane
    ) {
        console.log('Z rent Controler',this.rentService)
        return this.rentService.addNoweWypozyczenie(rentUserToolWController);
    }

    @Delete('/delete/:index')
    removeWWypozyczenie(
        @Param('index') index: string,
    ): RemoveWypozyczenieResponse {

        console.log('Index w controller', index);
        console.log('Index w controller', Number(index));
        return this.rentService.deleteRent(Number(index))
    }

    @Get('/list')
    listRent(){
        console.log('Cała tablica',this.rentService);
        return this.rentService;
    }

}
