// Wszystkie tyypy dla Modułów RENT
export interface AddRentToolToBase {
    isSuccess: boolean;
    index?: number;
}

export type AddRentToolToBase1Response = {
    isSuccess: true;
    index: number;
}  | {
    isSuccess: false;
}// w tym type w zależności co jest zmienia się "zawartość" typu

export interface RemoveWypozyczenieResponse {
    isSuccess: boolean;
}    // pozytywna odpowiedz jeśli usunięcie jest ok.