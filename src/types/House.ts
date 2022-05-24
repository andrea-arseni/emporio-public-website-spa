import Caratteristiche from "./Caratteristiche";
import File from "./File";

class House {
    caratteristicheImmobile?: Caratteristiche;
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
    fileFetched: boolean;

    constructor() {
        this.fileFetched = false;
        this.categoria = "residenziale";
        this.classeEnergetica = "A";
        this.comune = "";
        this.consumo = 0;
        this.contratto = "vendita";
        this.id = 0;
        this.indirizzo = "";
        this.libero = "";
        this.locali = 3;
        this.piano = "";
        this.prezzo = 0;
        this.ref = 0;
        this.riscaldamento = "";
        this.stato = "";
        this.status = "ATTIVO";
        this.superficie = 0;
        this.tipologia = "";
        this.titolo = "";
        this.zona = "";
        this.files = [];
    }
}

export default House;
