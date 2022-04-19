import Card from "../../components/UI/Card/Card";
import vendereImage from "../../assets/living.jpeg";
import comprareImage from "../../assets/kitchen.jpeg";
import affittareImage from "../../assets/bed.jpg";
import capannoneImage from "../../assets/capannone.jpg";
import renovateImage from "../../assets/renovate.jpg";
import attivitaImage from "../../assets/attività.jpg";
import moneyImage from "../../assets/money.jpeg";
import consulenzaImage from "../../assets/services.jpeg";
import disegnoImage from "../../assets/disegno.jpeg";
import condominioImage from "../../assets/condominio.jpeg";
import apeImage from "../../assets/ape.jpeg";
import tribunaleImage from "../../assets/tribunale.jpeg";
import { useNavigate } from "react-router-dom";

type servizio = {
    image: string;
    message: string;
    name: string;
};

const Servizi: React.FC = () => {
    const navigate = useNavigate();

    const servizi: servizio[] = [
        {
            image: vendereImage,
            message: "VENDERE CASA",
            name: "vendere-casa",
        },
        {
            image: comprareImage,
            message: "COMPRARE CASA",
            name: "comprare-casa",
        },
        {
            image: affittareImage,
            message: "AFFITTARE / LOCARE",
            name: "affittare-locare",
        },
        {
            image: capannoneImage,
            message: "GESTIONE IMMOBILI COMMERCIALI E/O INDUSTRIALI",
            name: "immobili-commerciali",
        },
        {
            image: renovateImage,
            message: "RISTRUTTURAZIONI",
            name: "ristrutturazioni",
        },
        {
            image: attivitaImage,
            message: "CESSIONE ATTIVITA'",
            name: "cessione-attivita",
        },
        {
            image: moneyImage,
            message: "CONSULENZA FINANZIARIA",
            name: "consulenza-finanziaria",
        },
        {
            image: consulenzaImage,
            message: "CONSULENZE NOTARILI E/O LEGALI",
            name: "consulenze-notarili-legali",
        },
        {
            image: disegnoImage,
            message: "PRATICHE CATASTALI E/O COMUNALI",
            name: "pratiche-catastali-comunali",
        },
        {
            image: condominioImage,
            message: "AMMINISTRAZIONI DI CONDOMINIO",
            name: "amministrazioni-condominio",
        },
        {
            image: apeImage,
            message: "ATTESTATI DI PRESTAZIONE ENERGETICA",
            name: "attestati-prestazione-energetica",
        },
        {
            image: tribunaleImage,
            message: "PERIZIE IMMOBILIARI GIURATE",
            name: "perizie-immobiliari",
        },
    ];

    const serviceCards = servizi.map((el) => (
        <div key={el.message} className={`col-md-3 centered`}>
            <Card
                message={el.message}
                onClick={() => navigate(el.name)}
                imageSrc={el.image}
            />
        </div>
    ));

    return (
        <div className={`page blue`}>
            <div className={`row`}>{serviceCards}</div>
        </div>
    );
};

export default Servizi;
