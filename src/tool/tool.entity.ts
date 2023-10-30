import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RentEntity} from "../rent/rent.entity";

@Entity()
export class ToolEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idTool: string ;

    @Column({
        length: 100,
    })
    nameTool: string;

    @Column({
        type: 'int',
        precision: 6,
    })
    depositTool: number;

    @Column({
        default: true,
    })
    availabilityTool: boolean;

    @Column({
        type: "int",
        precision: 5,
        default: 0,
    })
    toolCounterRent: number;

    // @Column()
    // dataZakupu: Date;
    //
    // @Column()
    // kosztZakupu: number;
    //
    // @Column()
    // kwotaZaDzien: number;
    //
    //
    // @Column()
    // stopienZuzycia: string;
    //

    @OneToMany(type => RentEntity, rent => rent.idTool)
    @JoinColumn({ name: 'idTool' })
    rents: RentEntity[];



    // @OneToMany( type  => RentEntity, entity => entity.toolId)
    // @JoinColumn()
    // toolId: RentEntity;

}