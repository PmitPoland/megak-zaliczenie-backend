import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {rentServiceDto} from "./dto/rent.service.dto";
import {AddNewRent, AddRentToolToBase1Response, RemoveWypozyczenieResponse} from "../interface/rent";
import {UserService} from "../user/user.service";
import {ToolService} from "../tool/tool.service";
import {InjectRepository} from "@nestjs/typeorm";
import {IsNull, LessThan, Not, Repository} from "typeorm";
import {RentEntity} from "./rent.entity";
import {ToolEntity} from "../tool/tool.entity";
import {UserEntity} from "../user/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CreateToolDto} from "../tool/dto/create-tool.dto";
import {UserListResponse} from "../interface/user";
import {not} from "rxjs/internal/util/not";


@Injectable()
export class RentService {
    private rentService: rentServiceDto[] = [];

    constructor(
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => ToolService)) private toolService: ToolService,
        @InjectRepository(RentEntity) private rentEntityRepository: Repository<RentEntity>,
        @InjectRepository(ToolEntity) private toolEntityRepository: Repository<ToolEntity>,
        @InjectRepository(UserEntity) private userEntityRepository: Repository<UserEntity>,
        // todo można to wywalić E8D12 (32:00) przejście na ActiveRecords
    ) {
    }


    async addNoweWypozyczenie(addNewRent: AddNewRent): Promise <AddRentToolToBase1Response> {
        console.log('z controlera ', addNewRent.idUser, addNewRent.idTool);
        const idUser = addNewRent.idUser;
        const idTool = addNewRent.idTool;

        // const user: CreateUserDto = await this.userEntityRepository.findOne({
        const user: CreateUserDto = await UserEntity.findOne({
            where: {idUser}
        });
        const tool: CreateToolDto = await ToolEntity.findOne({
            where: {idTool}
        });

        console.log('--- tool ---', tool);

        if (user) {
            console.log('User znaleziony')
            console.log('--- User ---', user);
        } else {
            console.log('brak takiego usera');
            throw new Error('Użytkownik nie znaleziony.')
        }
        if (tool &&
            tool.availabilityTool ) {
            console.log('Tool - znalezione, można ?', tool.availabilityTool)
        }  else {
            console.log('Brak takiego narzędzia')
            throw new Error('Brak dostępnego narzędzia do wypożyczenia.')
        }

        await ToolEntity.update(tool, {
            availabilityTool: true,
        });


        // rentToUpdate.rentalActive = false;

        await this.rentEntityRepository.save(addNewRent);

        // this.toolService.counterRentTool(addNewRent.idTool);
        return {
                index: this.rentService.length - 1, // ile narzędzi wziął użytkownik, ten sam ID
                isSuccess: true,
            }
    }
//*******************

    async returnToolToRental(idRent){    // Oddaję urządzenie

       console.log('--- - -- Rent oddaję - - - - ')
       const rentToUpdate = await this.rentEntityRepository.findOne({
           where: {idRent}
       });
       const idTool = rentToUpdate.idTool;
       const tool: CreateToolDto = await ToolEntity.findOne({
            where: {idTool}
       });

        console.log(' --------------',rentToUpdate);
        if (rentToUpdate) {
            const newReturnDate = new Date();
            rentToUpdate.dataZwrotu = newReturnDate;
            rentToUpdate.rentalActive = false;

            await ToolEntity.update(tool, {
                availabilityTool: true,
            });

            await rentToUpdate.save();
        } else {
            throw new Error('Nie znaleziono wypożyczenia o podanym ID.');
        }
        console.log('zaktualizowane')
    }

    deleteRent (indexZController: number): RemoveWypozyczenieResponse {
        if(
            indexZController < 0 ||
            indexZController >= this.rentService.length
        ) {
            console.log(this.deleteRent);
            console.log('Lenghth',this.deleteRent.length);
            return {
                isSuccess: false,
            }
        }
        console.log(indexZController);
        this.rentService.splice(indexZController,1);
        return {
            isSuccess: true,
        }
    }


    async getListRent() {
        return  await RentEntity.find({
            relations: ['tool'],  // pobieranie relacji
        })
    }

    async getListUserRent(idUser) {

        // const userRent = await this.rentEntityRepository.findOne({
        //     where: {idUser}
        // });
            return  await RentEntity.find({
            where: {idUser}
        })
    }


    async getListActiveUserRent(idUser) {


        // const userRent = await this.rentEntityRepository.findOne({
        //     where: [{idUser},{drugi warunek}]
        // });
        //

        return  await RentEntity.find({
            // where: [{idUser}, {dataZwrotu: oddane}]   // pobieranie relacji
            where: {
                idUser: idUser,
                rentalActive: true,
            }
        })
    }

    //  isUser (userName: string): boolean {



}
