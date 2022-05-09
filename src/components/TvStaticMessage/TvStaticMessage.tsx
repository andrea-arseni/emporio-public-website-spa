import tvMessage from "../../types/TvMessage";
import styles from "./TvStaticMessage.module.css";

const TvStaticMessage: React.FC<{
    currentIndex: number;
    itemIndex: number;
    isPreviousItem: (index: number) => boolean;
    item: tvMessage;
}> = (props) => {
    return (
        <div
            key={props.item.title}
            className={`${styles.wrapperTv} ${styles.absolute} ${
                props.itemIndex === props.currentIndex ? styles.active : ""
            } ${props.isPreviousItem(props.itemIndex) ? styles.ended : ""}`}
        >
            <img
                className={`${styles.imageTv} ${styles.absolute}`}
                alt="Immagine non disponibile"
                src={props.item.image}
            />
            <div className={`${styles.darkBackdrop} ${styles.absolute}`}></div>
            <div
                className={`centered vertical ${styles.absolute} ${styles.text}`}
            >
                <h1>{props.item.title}</h1>
                <h3>
                    {props.item.message}
                    <br />
                    <br />
                    Vuoi saperne di più?{" "}
                    <span style={{ color: "yellow" }}>Entra in agenzia!</span>
                </h3>
            </div>
        </div>
    );
};

export default TvStaticMessage;
