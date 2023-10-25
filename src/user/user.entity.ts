import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity  extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    idUser: string;

    @Column({
        length: 250,
    })
    nameUser: string;

    @Column({
        length: 22,
    })
    phoneUser: string

    @Column({
        length: 100,
        default: '',
    })
    emailUser: string;

    @Column({
        length: 1000,
        default: null,      // domyślna wartość
        nullable: true,     // pzwalaj na null mało miejsca w bazie zajmuje
    })
    noteUser: string;

    @Column({
        type: "int",
        precision: 4,
        default: 0,
    })
    userCounterOfRent: number;

}
