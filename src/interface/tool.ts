import {CreateToolDto} from "../tool/dto/create-tool.dto";

export type AddToolToBase = CreateToolDto;
//     idTool: string ;
//     nameTool: string;
//     depositTool: number;
//     // availabulityTool: true; // nie będzie możliwości wprowadzenia ręcznie danych
//
// }  // Typ : do dodawania produktu #todo skasować id: będzie się samo dodawało

export type AddNewToolToBase1Response = {
    isSuccess: true;
    index: number;
}  | {
    isSuccess: false;
}

export type ToolType = CreateToolDto;


export type ListToolResponse = CreateToolDto[];

export type RemoveToolResponse = {
    isSuccess: boolean,
} // czy usunieto narzędzie z listy / - mogło go np: nie być

export type GetCautionResponse = number | {
    isSuccess: false;
}
