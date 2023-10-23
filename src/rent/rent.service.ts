import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {NewRentDto} from "./dto/new-rent.dto";
import {AddRentToolToBase1Response, RemoveWypozyczenieResponse} from "../interface/rent";
import {UserService} from "../user/user.service";
import {ToolService} from "../tool/tool.service";

@Injectable()
export class RentService {
    private rentUserToolDoController: NewRentDto[] = [];

    constructor(
        //@Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() =>ToolService)) private toolService: ToolService
    ) {
    }


    addNoweWypozyczenie(rentUserToolWController: NewRentDto): AddRentToolToBase1Response {
        this.rentUserToolDoController.push(rentUserToolWController)
        console.log('z controlera ', rentUserToolWController);
        console.log('z RentService', this.rentUserToolDoController);

        if (
            typeof rentUserToolWController.idUser !== 'string' ||
            typeof rentUserToolWController.idTool !== 'string' ||
            rentUserToolWController.idUser === '' ||
            rentUserToolWController.idTool === ''
        ) {
            return {
                isSuccess: false,
            }
        }
        return {
                index: this.rentUserToolDoController.length - 1, // ile narzędzi wziął użytkownik, ten sam ID
                isSuccess: true,
            }
    }

    removeWypozyczenie (indexZController: number): RemoveWypozyczenieResponse {
        if(
            indexZController < 0 ||
            indexZController >= this.rentUserToolDoController.length
        ) {
            console.log(this.removeWypozyczenie);
            console.log('Lenghth',this.removeWypozyczenie.length);
            return {
                isSuccess: false,
            }
        }
        console.log(indexZController);
        this.rentUserToolDoController.splice(indexZController,1);
        return {
            isSuccess: true,
        }
    }

}