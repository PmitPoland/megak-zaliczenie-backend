import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity()
export class RentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    idRent: number;

    // @ManyToOne(() => UserEntity, klient => klient.wypozyczenia)
    // @JoinColumn({ name: 'klientId' })
    // klient: Klient;
    //
    // @ManyToOne(() => Narzedzie, narzedzie => narzedzie.wypozyczenia)
    // @JoinColumn({ name: 'narzedzieId' })
    // narzedzie: Narzedzie;

    @Column()
    dataWypozyczenia: Date;

    @Column()
    dataZwrotu: Date;

    @Column()
    iloscDni: number;

    @Column()
    kaucjaZaplacona: boolean;

    @Column()
    kwotaDoZaplaty: number;

    @Column()
    narzedzieSprawne: boolean;
}
