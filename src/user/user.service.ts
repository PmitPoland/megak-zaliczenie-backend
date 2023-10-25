import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {
    AddNewUserToBase1Response, OneUser,
    UserListResponse
} from "../interface/user";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository, Like} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {RentService} from "../rent/rent.service";


// Service - służy do obsługi zapytań z Controlera. Tutaj ma być cała logika.

@Injectable()       // Injectable czyli można gdzieś go wstrzykiwać
export class UserService {
    private userService: CreateUserDto[] = [];



    constructor(
        @InjectRepository(UserEntity) private userEntityRepository: Repository<UserEntity>,
        @Inject(forwardRef(() => RentService)) private rentService: RentService,
    ) {
    }

    async addNewUser(newUser): Promise <AddNewUserToBase1Response> {

        const { nameUser, phoneUser, emailUser, userCounterOfRent} = newUser;
        console.log('Nowy user z user.serwice',newUser);
        if (
           typeof nameUser !== 'string' ||
            typeof phoneUser !== 'string' ||
            typeof emailUser !== 'string' ||
            nameUser === '' ||
            phoneUser === ''  // ||
            // this.isUser(newUser.idUser)
        ){
                return {
                    isSuccess: false,
                }
        }
        // this.userService.push(newUser);  // metoda bez bazy danych tylko w powietrzu obsługa

        await this.userEntityRepository.save(newUser);

        return {
            index: this.userService.length -1,
            isSuccess: true,
        }
    }
//*********************

    // Aktualizuje dane użytkownika

    async getUserList(): Promise <UserListResponse> {
        return await this.userEntityRepository.find();
    }


    async removeUser(idUser) {
        await this.userEntityRepository.delete(idUser);
    }




    // remove poniżej działało bardzo dobrze "w powietrzu" user o indeksie index
    // removeUser(index): RemoveUserFromBaseResponse {
    //     if (
    //         this.userService.length < 0 ||
    //         index >= this.userService.length
    //     ) {
    //           return {
    //             isSuccess: false,
    //         }
    //     }
    //
    //     this.userService.splice(index, 1);
    //     return {
    //         isSuccess: true,
    //     }
    // }

    async getUserById(idUser: string): Promise<OneUser> {
        //const oneUser = await this.userEntityRepository.findOne({
        const oneUser = await this.userEntityRepository.findOneOrFail({
                where: {idUser}
        });
        // if (!oneUser) {
        //     throw new Error('Brak id w bazie');
        // }    //  obsługa błędów.
        return oneUser;
    }


   //  Przerobić np: na takie same nazwiska wyszukiwanie
   //   async getUserById(idUserToFind: string): Promise<UserListResponse> {
   // //      return await (this.userService).filter(item => item.idUser === idUserToFind)
   //       return (this.userService).filter(item => item.idUser === idUserToFind);
   //   }

    async isUser (idUserFind: string): Promise <boolean> {
   //     return   await (this.userService).some(item => item.idUser === idUserFind);
        return (this.userService).some(item => item.idUser === idUserFind);
    }


    // async getUser(): Promise<UserResponse> {
    //     return await this.userEntityRepository.find();
    // }


    // sprawdzanie czy jest produkt o danym id / nazwie w wypożyczalni

    user_dane

}