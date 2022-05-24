import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={`page centered vertical`}>
            <div className={styles.backdrop_image}></div>
            <div className={styles.backdrop_dark}></div>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.text}>
                Sembra che tu ti sia perso...
                <br />
                Questa pagina non esiste!
            </h2>
            <div className={styles.buttonWrapper}>
                <Button color="blue" onClick={() => navigate("/home")}>
                    Home Page
                </Button>
                <Button
                    color="blue_outline"
                    onClick={() => navigate("/immobili")}
                >
                    Immobili
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
