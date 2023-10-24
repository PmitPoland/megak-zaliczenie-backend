import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity()
export class RentEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idRent: string;

    // @ManyToOne(() => UserEntity, klient => klient.wypozyczenia)
    // @JoinColumn({ name: 'klientId' })
    // klient: Klient;
    //
    // @ManyToOne(() => Narzedzie, narzedzie => narzedzie.wypozyczenia)
    // @JoinColumn({ name: 'narzedzieId' })
    // narzedzie: Narzedzie;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    dataWypozyczenia: Date;

    @Column()
    dataZwrotu: Date;

    @Column(
        {
            type: 'int',
            precision: 3,
        }
    )
    iloscDni: number;

    @Column()
    kaucjaZaplacona: boolean;

    @Column({
        type: 'float',
        precision: 10,
        scale: 2,
    })
    kwotaDoZaplaty: number;

    @Column()
    narzedzieSprawne: boolean;
}
