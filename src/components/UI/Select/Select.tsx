import React from "react";
import styles from "./Select.module.css";

const Select: React.FC<{
    labelName: string;
    options: { value: any; name: string }[];
    defaulValue: any;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    ref?: React.Ref<any>;
}> = React.forwardRef((props, ref: React.Ref<any>) => {
    const options = props.options.map((el) => (
        <option key={el.name} value={el.value}>
            {el.name}
        </option>
    ));

    return (
        <div className={styles.wrapper}>
            <label htmlFor={props.labelName}>{props.labelName}</label>
            <select
                ref={ref}
                onChange={props.onChange}
                id={props.labelName}
                defaultValue={props.defaulValue}
            >
                {options}
            </select>
        </div>
    );
});

export default React.memo(Select);
