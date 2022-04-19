import styles from "./Emporio.module.css";
import imageAgenzia from "../../assets/office_2.jpg";
import imageFimaa from "../../assets/fimaa.png";
import imagePremio from "../../assets/eccellenza.png";

const Emporio: React.FC = () => {
    return (
        <div className={`page ${styles.emporioPage}`}>
            <section className={`centered ${styles.emporio}`}>
                <div className={styles.text}>
                    <h2>Chi Siamo</h2>
                    <p>
                        EMPORIO CASE SAS NASCE IL 15 GIUGNO 1985 A MILANO.
                        <br />
                        SIAMO SPECIALIZZATI IN COMPRAVENDITE ED AFFITTI <br />
                        DI IMMOBILI SIA RESIDENZIALI CHE COMMERCIALI.
                        <br />
                        ISCRIZIONE AL REGISTRO DELLE IMPRESE AL N° 1723681 DELLA
                        CCIAA.
                        <br /> PARTITA IVA 04068690967.
                    </p>
                </div>
                <div className={`centered ${styles.imgWrapper}`}>
                    <img
                        className={styles.img}
                        alt="Non disponibile"
                        src={imageAgenzia}
                    />
                </div>
            </section>
            <section className={`centered ${styles.fimaa}`}>
                <div className={styles.text}>
                    <h2>SIAMO ASSOCIATI FIMAA </h2>
                    <p>
                        FIMAA (FEDERAZIONE ITALIANA MEDIATORI ED AGENTI
                        D'AFFARI)
                        <br /> rappresenta un marchio di garanzia <br />{" "}
                        svolgendo un ruolo di tutela della qualità professionale
                        ed etica degli iscritti <br /> che rispondono a
                        requisiti severi e verificabili.
                    </p>
                </div>
                <div className={`${styles.imgWrapper} centered`}>
                    <img
                        className={styles.imgFimaa}
                        alt="Non disponibile"
                        src={imageFimaa}
                    />
                </div>
            </section>
            <section className={`centered ${styles.partners}`}>
                <div className={styles.text}>
                    <h2>I NOSTRI PARTNERS</h2>
                    <p>
                        COLLABORIAMO DA ANNI CON I PORTALI <br /> PIU'
                        IMPORTANTI DEL SETTORE IMMOBILIARE <br />
                        FOCALIZZANDOCI SULLA QUALITA' DEI NOSTRI ANNUNCI <br />
                        NEL 2022 SIAMO STATI PREMIATI CON <br />
                        IL CERTIFICATO DI ECCELLENZA DI IMMOBILIARE.IT
                    </p>
                </div>
                <div
                    className={`${styles.imgWrapper} ${styles.white} centered`}
                >
                    <img
                        className={styles.imgPremio}
                        alt="Non disponibile"
                        src={imagePremio}
                    />
                </div>
            </section>
        </div>
    );
};

export default Emporio;
