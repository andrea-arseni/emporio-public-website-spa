import imageAgenzia from "../../assets/ufficio.jpg";
import imageFimaa from "../../assets/fimaa2.png";
import imagePremio from "../../assets/eccellenza.png";
import EmporioSection from "./EmporioSection/EmporioSection";

const Emporio: React.FC = () => {
    return (
        <div className={`page`}>
            <EmporioSection type="white" title="Chi Siamo" image={imageAgenzia}>
                <>
                    Emporio Case Sas nasce il 15 Giugno 1985 a Milano.
                    <br />
                    Siamo specializzati in compravendite ed affitti
                    <br />
                    di immobili sia residenziali che commerciali.
                    <br />
                    Siamo iscritti al Registro delle Imprese al N° 1723681 della
                    C.C.I.A.A.
                    <br /> Partita IVA 04068690967.
                </>
            </EmporioSection>
            <EmporioSection
                type="black"
                title="Siamo associati FIMAA"
                image={imageFimaa}
            >
                <>
                    FIMAA (Federazione Italiana Mediatori ed Agenti d'Affari)
                    <br /> rappresenta un marchio di garanzia <br /> svolgendo
                    un ruolo di tutela della qualità professionale ed etica
                    degli iscritti <br /> che rispondono a requisiti severi e
                    verificabili.
                </>
            </EmporioSection>
            <EmporioSection
                type="white"
                title="I nostri partners"
                image={imagePremio}
            >
                <>
                    Collaboriamo da anni con i portali <br /> più importanti del
                    settore immobiliare <br />
                    focalizzandoci sulla qualità dei nostri annunci. <br />
                    Nel 2022 siamo stati premiati con <br />
                    il certificato di eccellenza di Immobiliare.it.
                </>
            </EmporioSection>
        </div>
    );
};

export default Emporio;
