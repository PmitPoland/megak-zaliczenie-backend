export interface AddToolToBase {
    idTool: string ;
    nameTool: string;
    depositTool: number;
    // availabulityTool: true; // nie będzie możliwości wprowadzenia ręcznie danych

}  // Typ : do dodawania produktu #todo skasować id: będzie się samo dodawało

export type ToolType = {
    idTool: string,
    nameTool: string,
    depositTool: number,
    availabulityTool: true,
}

export type ListToolResponse = ToolType[];

export type RemoveToolResponse = {
    isSuccess: boolean,
} // czy usunieto narzędzie z listy / - mogło go np: nie być

export type GetCautionResponse = number | {
    isSuccess: false;
}
