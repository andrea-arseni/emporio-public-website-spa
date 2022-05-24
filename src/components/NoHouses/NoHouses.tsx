import styles from "./NoHouses.module.css";

const NoHouses: React.FC<{}> = () => {
    return (
        <div className={`centered ${styles.wrapper}`}>
            <div className={`vertical ${styles.content}`}>
                <div className={`${styles.backdrop}`}></div>
                <h2 className={styles.text}>
                    Nessun risultato per i criteri selezionati.
                </h2>
                <h3 className={styles.text}>
                    Prova con un altro filtro o contattaci, ti avviseremo quando
                    acquisiamo l'immobile che stai cercando!
                </h3>
            </div>
        </div>
    );
};

export default NoHouses;
