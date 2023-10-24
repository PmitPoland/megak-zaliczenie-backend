import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {
    AddNewUserToBase1Response,
    RegisterUserResponse,
    RemoveUserFromBaseResponse,
    User,
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

    addNewUser(newUser): AddNewUserToBase1Response {

        const {idUser, nameUser, phoneUser, emailUser} = newUser;

        console.log('Nowy user z user.serwice',newUser);
        if (
            typeof idUser !== 'string' ||
            typeof nameUser !== 'string' ||
            typeof phoneUser !== 'string' ||
            typeof emailUser !== 'string' ||
            idUser === '' ||
            nameUser === '' ||
            phoneUser === '' ||
            this.isUser(newUser.idUser)
        ){
                return {
                    isSuccess: false,
                }
        }

        this.userService.push(newUser);
        return {
            index: this.userService.length -1,
            isSuccess: true,
        }
    }


    getUserList():UserListResponse {



        return this.userService;
    }

    removeUser(index): RemoveUserFromBaseResponse {
        if (
            this.userService.length < 0 ||
            index >= this.userService.length
        ) {
            // console.log('Typeoff Index', typeof (index));
            // console.log('If nie this.Length z remove', this.toolList.length);
            // console.log('If nie index z remove', index);
            return {
                isSuccess: false,
            }
        }

        this.userService.splice(index, 1);
        return {
            isSuccess: true,
        }
    }

     getUserById(idUserToFind: string) {
         return this.userService.filter(item => item.idUser === idUserToFind)
    }

    isUser (idUserFind: string): boolean {
        return this.userService.some(item => item.idUser === idUserFind);
    }


    // async getUser(): Promise<UserResponse> {
    //     return await this.userEntityRepository.find();
    // }


    // sprawdzanie czy jest produkt o danym id / nazwie w wypożyczalni

    user_dane

}