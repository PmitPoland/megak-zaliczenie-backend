import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {ToolEntity} from "../tool/tool.entity";

@Entity()
export class RentEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idRent: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    dataWypozyczenia: Date;

    @Column()
    idUser: string;

    @Column()
    idTool: string;

    @Column()
    dataZwrotu: Date;


    @Column(
        {
            type: 'int',
            precision: 3,
        }
    )
    iloscDni: number;
    //
    // @Column()
    // kaucjaZaplacona: boolean;
    //
    // @Column({
    //     type: 'float',
    //     precision: 10,
    //     scale: 2,
    // })
    // kwotaDoZaplaty: number;
    //
    // @Column()
    // narzedzieSprawne: boolean;

    @OneToOne(type => UserEntity)
    @JoinColumn()      // { name: 'klientId' }
    userId: UserEntity;

    @OneToOne( type  => ToolEntity)
    @JoinColumn()
    toolId: ToolEntity;


}
