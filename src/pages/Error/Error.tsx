import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import styles from "./Error.module.css";

const ErrorPage: React.FC<{ message: string }> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const where =
        location.pathname.split("?")[0].split("/").pop() === "immobili"
            ? "Contatti"
            : "Immobili";

    return (
        <div className="page centered vertical">
            <div className={styles.wrapper}>
                <h1 className={styles.errorMessage}>{props.message}</h1>
                <div className={styles.buttonWrapper}>
                    <Button color="red" onClick={() => navigate(-1)}>
                        Indietro
                    </Button>
                    <Button
                        color="red_outline"
                        onClick={() => navigate(`/${where.toLowerCase()}`)}
                    >
                        {where}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
