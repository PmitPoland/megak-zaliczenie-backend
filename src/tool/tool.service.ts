import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {GetCautionResponse, ListToolResponse, RemoveToolResponse, ToolType} from "../interface/tool";
import {RentService} from "../rent/rent.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../user/user.entity";
import {Repository} from "typeorm";
import {ToolEntity} from "./tool.entity";


@Injectable()
export class ToolService {
    private toolList: ToolType[] = [];


    constructor(
        @Inject(forwardRef(() => RentService)) private rentService: RentService,
        @InjectRepository(ToolEntity) private toolEntityRepository: Repository<ToolEntity>,
    ) {
    }

    addNewTool(newTool) {
        // this.toolList.push(newTool);

        console.log('nameTool', newTool.nameTool);
        console.log('idTool', newTool.idTool);
        if (
            typeof newTool.nameTool !== 'string' ||
            typeof newTool.idTool !== 'string' ||
            newTool.nameTool === '' ||
            newTool.idTool === '' ||
            newTool.depositTool < 0 ||
            this.isTool(newTool.idTool)
        ) {

            return {
                isSuccess: false,
            }
        }

        console.log('Tool z ToolService');
        this.toolList.push(newTool);
        return {
            index: this.toolList.length -1,
            isSuccess: true,
        }
    }

    removeTool(index: number): RemoveToolResponse {

        console.log('this.Length z remove', this.toolList.length);
        console.log('index z remove', index);
        if (
            this.toolList.length < 0 ||
            index >= this.toolList.length
        ) {
            console.log('Typeoff Index', typeof (index));
            console.log('If nie this.Length z remove', this.toolList.length);
            console.log('If nie index z remove', index);
            return {
                isSuccess: false,
            }
        }

        this.toolList.splice(index, 1);
        return {
            isSuccess: true,
        }
    }

    getToolList():ListToolResponse{
        return this.toolList;
    }

    isTool (idToolFind: string): boolean {
        return this.toolList.some(item => item.idTool === idToolFind);
    }

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
