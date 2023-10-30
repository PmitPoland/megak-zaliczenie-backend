import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Post} from '@nestjs/common';
import {rentServiceDto} from "./dto/rent.service.dto";
import {RentService} from "./rent.service";
import {AddNewRent, RemoveWypozyczenieResponse} from "../interface/rent";
import {ListToolResponse} from "../interface/tool";

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

    @Get('/rentlist')
    listRent_Relation(){                    // todo zmienić nazwę
        console.log('Cała tablica',this.rentService);
        return this.rentService.getListRent();
    }

    @Post('/returntool/:idRent')
    returnTool (
        @Param('idRent') idRent: string,
    ){

        return this.rentService.returnToolToRental(idRent);
    }

    @Get('/userrent/:userId')
    listUserRent
    (
        @Param('userId') userId: string,
    ){

        return this.rentService.getListUserRent(userId);
    }

    @Get('/activeuserrent/:userId')
    listActiveUserRent
    (
        @Param('userId') userId: string,
    ){

        return this.rentService.getListActiveUserRent(userId);
    }


}
