import {Injectable} from '@nestjs/common';
import {RemoveToolResponse, ToolType} from "../interface/tool";


@Injectable()
export class ToolService {
    private toolList: ToolType[] = [];

    addNewTool(newTool) {
        // this.toolList.push(newTool);

        console.log('nameTool', newTool.nameTool);
        console.log('idTool', newTool.idTool);
        if (
            typeof newTool.nameTool !== 'string' ||
            typeof newTool.idTool !== 'string' ||
            newTool.nameTool === '' ||
            newTool.idTool === '' ||
            newTool.depositTool < 0
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
}
