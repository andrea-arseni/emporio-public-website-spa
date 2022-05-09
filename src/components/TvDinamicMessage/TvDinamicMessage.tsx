import House from "../../types/House";
import styles from "./TvDinamicMessage.module.css";
import { stringifyNumber } from "../../utils/numberHandler";

const TvDinamicMessage: React.FC<{
    currentIndex: number;
    itemIndex: number;
    isPreviousItem: (index: number) => boolean;
    house: House;
}> = (props) => {
    return (
        <div
            key={props.house.id}
            className={`${styles.wrapperTv} ${styles.absolute} ${
                props.itemIndex === props.currentIndex ? styles.active : ""
            } ${props.isPreviousItem(props.itemIndex) ? styles.ended : ""}`}
        >
            <img
                className={`${styles.imageTv} ${styles.absolute}`}
                alt="Immagine non disponibile"
                src={props.house.immagine}
            />
            <div
                className={`vertical ${styles.absolute} ${styles.textWrapper}`}
            >
                <div className={styles.text}>
                    <h3>{props.house.titolo}</h3>
                    <h3>
                        {"€  "}
                        {stringifyNumber(props.house.prezzo)}
                        {props.house.contratto === "affitto" ? " al mese" : ""}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default TvDinamicMessage;
