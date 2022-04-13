import styles from "./Spinner.module.css";

const Spinner: React.FC<{
    type: "white" | "blue";
}> = (props) => (
    <div className={`${styles.spinner} ${styles[props.type]}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Spinner;
