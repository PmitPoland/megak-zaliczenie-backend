import {Body, Controller, Get, Ip, Post, Headers, Redirect, Param, Inject, Delete, forwardRef} from '@nestjs/common';
import {
    AddNewUserToBase1Response, OneUser, UserListResponse
} from "../interface/user";
import {UserService} from "./user.service";

// Controler powinien tylko przyjmować dane i odsyłać ,obsługą tych danych powinne zajmować się servisy
// Każdy Controller ma przynajmniej jeden serwis
// jest to Providers i

@Controller('user')
export class UserController {

    constructor(  // wszędzie pod nazwą userService będzie nasz UserService
        @Inject(forwardRef(() => UserService)) private userService: UserService
    ) {}

    @Get('/')
    stronaGlowna ():string {
        return `Strona Główna - Użytkownik - Dodaj/usuń/ sprawdź użytownika`
    }

    @Post('/add')
    addUser (
        @Body() newUser     // tutaj definiujemy co to jest newUser !! POST/ @Body definiujemy
        //co będzie odbierane  będzie dodawany/twoorony
    ): Promise<AddNewUserToBase1Response>  {

        return this.userService.addNewUser(newUser);   // to zwracamy
    }

    @Get('/list')
    userListOnBase (): Promise<UserListResponse> {
       return this.userService.getUserList();
    }

    @Get('/user/:id')
    getUserById (
        @Param('id') idUser: string,
    ): Promise <OneUser>{
        return  this.userService.getUserById(idUser);
    }

    // @Get ('/update/:id')
    // updateUser(
    //     @Param('id') idUser: string,
    // ) {
    //     return this.userService.addUserRentTool(idUser);
    // }

    // @Get('/user/:id')
    // getUserById (
    //     @Param('id') idUser: string,
    // ): Promise <OneUser>{
    //     return  this.userService.getUserById(idUser);
    // }


    @Delete('/delete/:idUser')
    removeUserFromList(
        @Param('idUser') idUser: string,
    ) {
        return this.userService.removeUser(idUser);
    }




    // remove poniżej działało bardzo dobrze "w powietrzu" user o indeksie index
    // @Delete('/delete/:index')
    // deleteUserFromList(
    //     @Param('index') index: string,
    // ): RemoveUserFromBaseResponse {
    //     return this.userService.removeUser(Number(index));
    // }

  

    // @Post ('/test-dodaj')
    // zrobNowegoUsera (
    //     @Body() nowyUserZControlera: CreateUserDto,
    // ): CreateUserDto  {
    //     return this.userService.zrobNowegoUseraWSerwisie(nowyUserZControlera);
    // }



    //  POST  localhost:3007/user/test-dodaj    zwraca cały this.
// {
//     "id": "3",
//     "nazwisko": "3",
//     "email": "3",
//     "telefon": "783305050"
//}


    // - - - -P O S T ---
    // sprawdzanie w insomni POST - form url encoded
    // lub POST JSON {
    //             "id": "1",
    //             "name": "1",
    //             "email": "1",
    //             "phone": 783305050,
    //             "kara": false
    //         }



    // // E8D5 (14:30) - Headers, IP
    // @Get('/ip')
    // sprawdzamIp(
    //     @Headers('accept-encoding') headers: string,
    //     @Ip() ip: string,
    // )
    // {
    //     console.log(headers);
    //     return `<h1>Twój adres ip to - ${ip} </h1>`
    // }

    // @Get('/test')
    // async testSleep():Promise<any>{
    //     return await testowy_sllep()
    // }

    // @Get('/przekieruj')
    // @Redirect('http://onet.pl')
    // async przekieruj():Promise<any>{
    //     return await testowy_sllep()
    // }

    // @Get('kto/:name/:age')      // E8D6 (24:00)
    // parametry(
    //     @Param('name') name: string,
    //     @Param('age') age: number
    // ) {
    //     // GET localhost:3005/user/kto/piotr/1
    //     return `Witam ${name} masz już ${age} lat.`
    // }

    // @Get('link/:id/:title?')   // czyli Age moe musi być, ale może być aby np. w google ładnie wyglądało
    // parametryOpcjonalne(
    //     @Param('id') id: number,
    //
    // ) {
    //     return `Witam ${id} `
    // }



}

// propozycje od pomocnika
// @Get()
// findAll(): Promise<Klient[]> {
//     return this.klientService.findAll();
// }
//
// @Post()
// create(@Body() klient: Klient): Promise<Klient> {
//     return this.klientService.create(klient);
// }
//
// @Put(':id')
// update(@Param('id') id: number, @Body() klient: Klient): Promise<Klient> {
//     return this.klientService.update(id, klient);
// }
//
// @Delete(':id')
// remove(@Param('id') id: number): Promise<void> {
//     return this.klientService.remove(id);
// }



