import tvMessage from "../../types/TvMessage";
import styles from "./TvStaticMessage.module.css";

const TvStaticMessage: React.FC<{
    itemIndex: number;
    item: tvMessage;
}> = (props) => {
    return (
        <div key={props.item.title} className={` ${styles.absolute}`}>
            <img
                className={`${styles.imageTv} ${styles.absolute}`}
                alt="Immagine non disponibile"
                src={props.item.image}
            />
            <div className={`${styles.darkBackdrop} ${styles.absolute}`}></div>
            <div className={`${styles.absolute} ${styles.text}`}>
                <div></div>
                <h1 className={styles.title}>{props.item.title}</h1>
                <h2 className={styles.body}>
                    {props.item.message}
                    <br />
                    Vuoi saperne di più?{" "}
                    <span style={{ color: "yellow" }}>Entra in agenzia!</span>
                </h2>
            </div>
        </div>
    );
};

export default TvStaticMessage;
