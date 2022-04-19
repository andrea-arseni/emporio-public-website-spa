import styles from "./TextMessage.module.css";

const TextMessage: React.FC<{}> = (props) => {
    return <div className={styles.text}>{props.children}</div>;
};

export default TextMessage;
