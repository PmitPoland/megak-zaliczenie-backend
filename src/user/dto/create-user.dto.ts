export class CreateUserDto {
    idUser: string;
    nameUser: string;
    phoneUser: string;
    emailUser: string;
    userCounterOfRent: number;
    // kara: 'true'|'false',
}

//
// clasa która mówi jakie dane otrzymamy z frontendu czy też od klienta czy API
// Jeśli dodajesz jakieś pole do tej klasy upewnij się, że masz takie pole w bazie UserEntity
// oraz w addNewUser - które z tego korzysta.