import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Post} from '@nestjs/common';
import {rentService} from "./dto/rent.service";
import {RentService} from "./rent.service";
import {AddNewRent, RemoveWypozyczenieResponse} from "../interface/rent";

@Controller('rent')
export class RentController {

    constructor(
        @Inject(forwardRef(() => RentService)) private rentService: RentService,
    ) {}

    @Post('/add')
    noweWypozyczenie(
        @Body() addNewRent: AddNewRent   // Dzięki Body możemy odbierać dane
    ) {
        console.log('Z rent Controler',this.rentService)
        return this.rentService.addNoweWypozyczenie(addNewRent);
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

    @Post('/returntool/:idRent')
    returnTool (
        @Param('idRent') idRent: string,
    ){

        return this.rentService.returnToolToRental(idRent);
}

}
