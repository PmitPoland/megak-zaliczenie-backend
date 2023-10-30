import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany, OneToOne,
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
            default: 1,
        }
    )
    iloscDni: number;
    //
    @Column(
        {
            default: true,
        }
    )
    rentalActive: boolean;
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

    @ManyToOne(type => UserEntity, user => user.rents)
    @JoinColumn({ name: 'idUser' })
    user: UserEntity;
    //
    @ManyToOne(type => ToolEntity, tool => tool.rents)
    @JoinColumn({ name: 'idTool' })
    tool: ToolEntity;
}
