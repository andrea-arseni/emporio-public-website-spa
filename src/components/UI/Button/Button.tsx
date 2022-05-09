import styles from "./Button.module.css";
export type color =
    | "blue"
    | "green"
    | "red"
    | "blue_outline"
    | "red_outline"
    | "green_outline";

const Button: React.FC<{
    onClick: (event: React.FormEvent) => void;
    color: color;
    disabled?: boolean;
    fillSpace?: boolean;
}> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`${styles.button} ${styles[props.color]} ${
                props.disabled && styles.disabled
            } ${props.fillSpace && styles.fillSpace}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
