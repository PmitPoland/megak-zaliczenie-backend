import {Body, Controller, Delete, forwardRef, Get, Inject, Param, Post} from '@nestjs/common';
import {ToolService} from "./tool.service";
import {AddToolToBase, RemoveToolResponse} from "../interface/tool";


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
    listTool() {
        console.log('Cała tablica',this.toolService);
        return this.toolService;
    }

    @Delete ('/delete/:index')
    deleteToolFromList (
        @Param('index') index: string,
    ): RemoveToolResponse{
        return this.toolService.removeTool(Number(index));
    }

}
