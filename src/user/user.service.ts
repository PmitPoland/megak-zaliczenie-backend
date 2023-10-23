import { Injectable } from '@nestjs/common';
import {
    AddNewUserToBase1Response,
    RegisterUserResponse,
    RemoveUserFromBaseResponse,
    User,
    UserList
} from "../interface/user";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";


// Service - służy do obsługi zapytań z Controlera. Tutaj ma być cała logika.

@Injectable()       // Injectable czyli można gdzieś go wstrzykiwać
export class UserService {
    private userList: UserList[] = [];

    constructor(
        @InjectRepository(UserEntity) private userEntityRepository: Repository<UserEntity>,
    ) {
    }

    addNewUser(newUser): AddNewUserToBase1Response {

        console.log('Nowy user z user.serwis=ce',newUser);
        if (
            typeof newUser.idUser !== 'string' ||
            typeof newUser.nameUser !== 'string' ||
            typeof newUser.phoneUser !== 'string' ||
            typeof newUser.emailUser !== 'string' ||
            newUser.idUser === '' ||
            newUser.nameUser === '' ||
            newUser.phoneUser === ''
        ){
                return {
                    isSuccess: false,
                }
        }

        this.userList.push(newUser);
        return {
            index: this.userList.length -1,
            isSuccess: true,
        }
    }


    getUserList() {


        // listaUserowWSerwisie = lista;
        return this.userList;
    }

    removeUser(index): RemoveUserFromBaseResponse {
        if (
            this.userList.length < 0 ||
            index >= this.userList.length
        ) {
            // console.log('Typeoff Index', typeof (index));
            // console.log('If nie this.Length z remove', this.toolList.length);
            // console.log('If nie index z remove', index);
            return {
                isSuccess: false,
            }
        }

        this.userList.splice(index, 1);
        return {
            isSuccess: true,
        }
    }


    // async getUser(): Promise<UserResponse> {
    //     return await this.userEntityRepository.find();
    // }


    // sprawdzanie czy jest produkt o danym id / nazwie w wypożyczalni


}