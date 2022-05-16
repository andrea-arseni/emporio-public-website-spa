import { useState } from "react";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import styles from "./FeaturesWrapper.module.css";

const FeaturesWrapper: React.FC<{
    title: string;
    contentVisible?: boolean;
}> = (props) => {
    const [isContentVisible, setIsContentVisible] = useState(
        props.contentVisible
    );

    const contentVisibilityToggler = () =>
        setIsContentVisible((prevState) => !prevState);

    return (
        <div className={`${styles.featureWrapper}`}>
            <h3
                className={`${styles.title}`}
                onClick={contentVisibilityToggler}
            >
                <div></div>
                {props.title}
                {
                    <div
                        className={`centered ${styles.arrowWrapper} ${
                            isContentVisible ? styles.changed : ""
                        }`}
                    >
                        <Arrow />
                    </div>
                }
            </h3>
            {isContentVisible && props.children}
        </div>
    );
};

export default FeaturesWrapper;
