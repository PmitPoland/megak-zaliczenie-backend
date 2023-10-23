import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class UserEntity  extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    nameUser: string;

    @Column({
        length: 10,
    })
    phoneUser: string

    @Column({
        length: 250,
    })
    emailUser: string;

}
