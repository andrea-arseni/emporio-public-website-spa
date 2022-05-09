import { Fragment } from "react";
import styles from "./ImagesBackdrop.module.css";

const ImagesBackdrop: React.FC<{}> = () => {
    const classes = [];

    for (let i = 0; i < 5; i++) {
        classes.push(`${styles.backdropImage} ${styles[`image_${i}`]}`);
    }

    const images = classes.map((el) => <div key={el} className={el}></div>);

    return <Fragment>{images}</Fragment>;
};

export default ImagesBackdrop;
