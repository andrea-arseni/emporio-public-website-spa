import React, { Fragment } from "react";
import styles from "./Input.module.css";

type inputType = "text" | "number" | "email" | "textarea";

const Input: React.FC<{
    type: inputType;
    id?: string;
    value?: string;
    little?: boolean;
    isInvalid?: boolean;
    onChange?: (event: any) => void;
    onBlur?: () => void;
    invalidMessage?: string;
    ref: React.Ref<any>;
    rows?: number;
    readOnly?: boolean;
}> = React.forwardRef((props, ref: React.Ref<any>) => {
    return (
        <Fragment>
            <div
                className={`${props.isInvalid && styles.invalid} ${
                    styles.formControl
                } ${props.little && styles.little}  vertical`}
            >
                <label>
                    {`${props.children} ${
                        props.isInvalid ? "* " + props.invalidMessage : ""
                    }`}
                </label>
                {props.type !== "textarea" && (
                    <input
                        className="form-control"
                        readOnly={props.readOnly}
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
                        className="form-control"
                        value={props.value}
                        id={props.id}
                        rows={props.rows ? props.rows : 4}
                        ref={ref}
                        onChange={props.onChange}
                    ></textarea>
                )}
            </div>
        </Fragment>
    );
});

export default Input;
