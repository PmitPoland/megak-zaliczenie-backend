export interface User {
    idUser: string,
    nameUser: string,
    phoneUser: string,
    emailUser: string,    // może nie podawać
    // kara: 'true'|'false',
}

export type AddNewUserToBase1Response = {
    isSuccess: true;
    index: number;
}  | {
    isSuccess: false;
}// w tym type w zależności co jest zmienia się "zawartość" typu

export type  RemoveUserFromBaseResponse = {
    isSuccess: boolean;
}
export interface  RegisterUserResponse {
        nameUser: string,
        phoneUser: string,
        emailUser: string,
    // te dane zwracam z UserControler podczas rejestracji, Id doda się sam
}

export type UserList = User[];

export type PobierzListeUserowResponse = User[];



