import vendereImage from "../assets/living.jpeg";
import affittareImage from "../assets/bed.jpg";
import vecchiImage from "../assets/vecchi.jpg";
import domandeImage from "../assets/kitchen.jpeg";
import attivitaImage from "../assets/attività.jpg";
import tvMessage from "../types/TvMessage";

export const tvMessages: tvMessage[] = [
    {
        image: vendereImage,
        title: "Vendi Casa?",
        message:
            "Puoi affidarti a professionisti che vendono immobili dal 1985",
    },
    {
        image: affittareImage,
        title: "Cerchi un inquilino?",
        message: "Con noi la provvigione è solo 300 € + IVA",
    },
    {
        image: domandeImage,
        title: "Hai domande inerenti la compravendita o l'affitto di un immobile?",
        message: "Puoi ricevere senza impegno le risposte che cerchi",
    },
    {
        image: vecchiImage,
        title: "Hai bisogno di liquidità ma non vuoi lasciare casa?",
        message:
            "Potresti guadagnare dalla vendita della nuda proprietà del tuo immobile",
    },
    {
        image: attivitaImage,
        title: "Hai bisogno di vendere la tua attività?",
        message:
            "Con noi puoi farlo vedendo riconosciuto il tuo impegno professionale",
    },
];
