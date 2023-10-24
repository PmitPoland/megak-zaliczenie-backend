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

    @Column()
    availabilityTool: boolean;

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