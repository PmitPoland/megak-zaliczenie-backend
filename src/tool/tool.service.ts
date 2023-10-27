import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {
    AddNewToolToBase1Response,
    GetCautionResponse,
    ListToolResponse,
    ToolType
} from "../interface/tool";
import {RentService} from "../rent/rent.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ToolEntity} from "./tool.entity";

// Service - służy do obsługi zapytań z Controlera. Tutaj ma być cała logika.
@Injectable()
export class ToolService {
    private toolList: ToolType[] = [];


    constructor(
        @InjectRepository(ToolEntity) private toolEntityRepository: Repository<ToolEntity>,
        @Inject(forwardRef(() => RentService)) private rentService: RentService,
    ) {}

    // V.5 działa
    async addNewTool(newTool): Promise<AddNewToolToBase1Response> {

        if (
            typeof newTool.nameTool !== 'string' ||
            newTool.nameTool === '' ||
            newTool.depositTool < 0 // ||
            // this.isTool(newTool.idTool)  // todo  SPrawdzić tą walidację ???
        ) {
            return {
                isSuccess: false,
            }
        }

       await this.toolEntityRepository.save(newTool);
        return {
            index: this.toolList.length -1,
            isSuccess: true,
        }
    }

    // V5 działa
    async getToolList(): Promise<ListToolResponse>{
        return await this.toolEntityRepository.find();

    }
    // V5 działa  - getToolById
    async getToolById(idTool): Promise<ToolType>{

        const oneTool = await this.toolEntityRepository.findOneOrFail({
            where: {idTool}
        });

        // if (oneTool===null) {
        if (!oneTool) {
            console.log(' Nie znaleziono');
            throw new Error('Brak ID q bazi');
        }

        return oneTool;
        // return await this.toolEntityRepository.find(idTool); znajduje wszystkie 4 w iD

    }

    // V5 działa
    async removeTool(idUser: string) {
        await this.toolEntityRepository.delete(idUser)
    }

    isTool (idToolFind: string): boolean {
        return this.toolList.some(item => item.idTool === idToolFind);
    }


    // async counterRentTool(idtool: string){
    //     const tool = await this.toolEntityRepository.findOne(idtool);
    //
    //     tool.toolCounterRent++;
    //
    //     await this.toolEntityRepository.save(tool);
    //
    // }

    getCautionOfProduct (idToolToAsk: string): GetCautionResponse {

        console.log("this.toolList", this.toolList);
        console.log('Idtoask', idToolToAsk);
        console.log('this.isTool', this.isTool(idToolToAsk));
        if (!this.toolList.every(item => this.isTool(idToolToAsk))) {
            console.log('Coś poszło nie tak, zwracam false');
            return {
                isSuccess:false,
            }
        }
        console.log('Jak false nie powinno być')
        return this.toolList.find(item => item.idTool === idToolToAsk).depositTool;
    }


}



// async removeTool(index: number): Promise <RemoveToolResponse> {
    // if (             // kasowanie wg. indeksu
    //     this.toolList.length < 0 ||
    //     index >= this.toolList.length
    // ) {
    //     console.log('Typeoff Index', typeof (index));
    //     console.log('If nie this.Length z remove', this.toolList.length);
    //     console.log('If nie index z remove', index);
    //     return {
    //         isSuccess: false,
    //     }
    // }
    // this.toolList.splice(index, 1);
    // return {
    //     isSuccess: true,
    // }
// }
