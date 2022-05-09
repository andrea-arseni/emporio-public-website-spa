import styles from "./CookiesBanner.module.css";
import { hideBanner } from "../../store/cookie-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CookiesBanner: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const hideBannerHandler = () => dispatch(hideBanner());

    return (
        <div className={`${styles.banner} centered`}>
            <div className={styles.text}>
                Questo sito fa uso di cookie per migliorare l’esperienza di
                navigazione degli utenti e per raccogliere informazioni
                sull’utilizzo del sito stesso.
                <br /> Utilizziamo solo cookie tecnici, non cookie di parti
                terze per inviare messaggi promozionali. <br />
                Chiudendo questo banner, scorrendo questa pagina o cliccando
                qualunque suo elemento acconsenti all'uso dei cookie.
                <br /> Per avere ulteriori informazioni{" "}
                <Link to="/cookies" onClick={hideBannerHandler}>
                    clicca qui
                </Link>
                .
            </div>
            <div className={styles.x} onClick={hideBannerHandler}>
                X
            </div>
        </div>
    );
};

export default CookiesBanner;
