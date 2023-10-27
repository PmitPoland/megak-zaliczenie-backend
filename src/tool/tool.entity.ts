import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}