import File from "./File";

type House = {
    caratteristicheImmobile: null;
    categoria: "commerciale" | "residenziale";
    classeEnergetica: "A" | "B" | "C" | "D" | "E" | "F" | "G";
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
    immagine?: string;
};

export default House;
