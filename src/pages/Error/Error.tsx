import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import useWindowSize from "../../hooks/use-size";
import styles from "./Error.module.css";

const ErrorPage: React.FC<{ message: string }> = (props) => {
    const navigate = useNavigate();

    const [width] = useWindowSize();

    return (
        <div className="page centered vertical">
            <div className={`${styles.backdrop}`}></div>
            <div className={styles.wrapper}>
                <h1 className={styles.errorMessage}>{props.message}</h1>
                <div className={styles.buttonWrapper}>
                    <Button color="blue" onClick={() => navigate(`/immobili`)}>
                        {`${width >= 500 ? `Vai agli ` : ""}Immobili`}
                    </Button>
                    <Button color="blue_outline" onClick={() => navigate(-1)}>
                        Indietro
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
