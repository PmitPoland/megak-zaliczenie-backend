import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ToolEntity extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idTool: string ;

    @Column()
    nameTool: string;

    @Column()
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