import styles from "./Map.module.css";

const Map: React.FC<{}> = () => {
    return (
        <iframe
            className={styles.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2920.612800593646!2d9.291988090245884!3d45.494206830262996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c87bb70312c3%3A0xf5f13ddf9ac00f7!2sVia%20Gramsci%2C%2034%2C%2020090%20Segrate%20MI!5e0!3m2!1sit!2sit!4v1630506018956!5m2!1sit!2sit"
            allowFullScreen
        ></iframe>
    );
};

export default Map;
