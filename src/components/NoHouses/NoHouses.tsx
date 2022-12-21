import { useNavigate } from "react-router-dom";
import styles from "./NoHouses.module.css";

const NoHouses: React.FC<{}> = () => {
    const navigate = useNavigate();

    return (
        <div className={`centered ${styles.wrapper}`}>
            <div className={`vertical ${styles.content}`}>
                <div className={`${styles.backdrop}`}></div>
                <h2 className={styles.text}>
                    Nessun risultato per i criteri selezionati.
                </h2>
                <div className="centered vertical">
                    <h3 className={styles.text}>
                        Prova con un altro filtro o contattaci, ti avviseremo
                        quando acquisiamo l'immobile che stai cercando!
                    </h3>
                    <div className={`centered ${styles.buttons}`}>
                        <button
                            className="btn btn-primary bordered"
                            onClick={() => navigate("/contattaci")}
                        >
                            Contattaci
                        </button>
                        <button
                            className="btn btn-outline-light"
                            onClick={() => {
                                window.location.assign("/immobili");
                            }}
                        >
                            Azzera Filtro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoHouses;
