import Caratteristiche from "./Caratteristiche";
import File from "./File";

type House = {
    caratteristicheImmobile: Caratteristiche;
    categoria: "commerciale" | "residenziale";
    classeEnergetica: "A" | "B" | "C" | "D" | "E" | "F" | "G" | "ESENTE";
    comune: string;
    consumo: number;
    contratto: "vendita" | "affitto";
    id: number;
    indirizzo: string;
    libero: string;
    locali: number;
    piano: string;
    prezzo: number;
    ref: number;
    riscaldamento: string;
    stato: string;
    status: "ATTIVO" | "DISATTIVO";
    superficie: number;
    tipologia: string;
    titolo: string;
    zona: string;
    files: File[];
};

export default House;
