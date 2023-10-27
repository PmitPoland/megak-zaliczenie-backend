import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Post} from '@nestjs/common';
import {ToolService} from "./tool.service";
import {AddToolToBase, GetCautionResponse, ListToolResponse, RemoveToolResponse, ToolType} from "../interface/tool";
import {CreateToolDto} from "./dto/create-tool.dto";


// Controler powinien tylko przyjmować dane i odsyłać ,obsługą tych danych powinne zajmować się servisy
// Każdy Controller ma przynajmniej jeden serwis
@Controller('tool')
export class ToolController {

    constructor(
        @Inject(forwardRef(() => ToolService)) private toolService: ToolService,
) {}

    @Get('/')
    stronaGlowna () {
        return `Strona główna NARZĘDZIA`
    }

    @Post('/add')
    addTool(
        @Body() newTool: AddToolToBase,
    )
    {
        console.log(newTool);
        return this.toolService.addNewTool(newTool);
    }

    @Get('/list')
    listTool(): Promise <ListToolResponse> {
        //console.log('Cała tablica',this.toolService);
        return this.toolService.getToolList();
    }

    @Get('/borrowedList')
    listBorrowedTool(): Promise <ListToolResponse> {
        return this.toolService.getBorrowedTool();
    }


    @Delete ('/delete/:idUser')
    deleteToolFromList (
        @Param('idUser') idUser: string,
    ){
        return this.toolService.removeTool(idUser);
    }

    @Get('/id/:idtool')
    getToolById(
        @Param('idtool') idToolToAsk: string,
    ): Promise<ToolType>{
        return this.toolService.getToolById(idToolToAsk)
    }

    @Get('/name/:data')
    getToolByName(
        @Param('data') data: string,
    ):Promise<ListToolResponse>{
        return this.toolService.findToolByName(data)
    }



    @Get('/caution/:idtool')
    getCaution(
        @Param('idtool') idToolToAsk: string,
    ): GetCautionResponse{
        return this.toolService.getCautionOfProduct(idToolToAsk)
    }
}
