import React, { Fragment } from "react";
import styles from "./Input.module.css";

type inputType = "text" | "number" | "email" | "textarea";

const Input: React.FC<{
    type: inputType;
    id: string;
    value: string;
    isInvalid?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    invalidMessage?: string;
    ref: React.Ref<any>;
    rows?: number;
}> = React.forwardRef((props, ref: React.Ref<any>) => {
    return (
        <Fragment>
            <div
                className={`${styles.inputWrapper} ${
                    props.isInvalid && styles.invalid
                }`}
            >
                <label htmlFor={props.id}>{props.children}</label>
                {props.type !== "textarea" && (
                    <input
                        ref={ref}
                        type={props.type}
                        id={props.id}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                        value={props.value}
                    />
                )}
                {props.type === "textarea" && (
                    <textarea
                        id={props.id}
                        rows={props.rows ? props.rows : 4}
                        ref={ref}
                    ></textarea>
                )}
            </div>
            <div className={styles.errorMessage}>
                {props.isInvalid ? props.invalidMessage : " "}
            </div>
        </Fragment>
    );
});

export default Input;