import { services } from "../../static-data/services";
import ContactForm from "../../components/ContactForm/ContactForm";
import { Navigate, useLocation } from "react-router-dom";
import styles from "./Servizio.module.css";
import useWindowSize from "../../hooks/use-size";
import Contattaci from "../Contattaci/Contattaci";

const Servizio: React.FC<{}> = () => {
    const [width] = useWindowSize();

    const location = useLocation();

    const key = location.pathname.split("/").pop();

    let serviceTitle = null;
    let serviceMessage = null;

    const service = services.find((el) => el.name === key);
    try {
        serviceTitle = (
            <h2 style={{ fontWeight: "lighter" }}>{service!.title}</h2>
        );
        const textArray = service!.message;
        serviceMessage = textArray.map((el, index) => <p key={index}>{el}</p>);
    } catch (e) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div
                className={`page container-fluid text-center fullHeight ${styles.container}`}
            >
                <img
                    alt="Non disponibile"
                    src={service?.image}
                    className={`fullHeight fullWidth ${styles.image}`}
                />
                <div className={`row fullHeight ${styles.row}`}>
                    <div className="col-md-6 centered">
                        <div className={`vertical centered ${styles.dati} `}>
                            {serviceTitle}
                            <br />
                            {serviceMessage}
                        </div>
                    </div>
                    {width > 767 && (
                        <div className={`col-md-6 fullHeight centered`}>
                            <ContactForm />
                        </div>
                    )}
                </div>
            </div>
            {width <= 767 && <Contattaci local />}
        </>
    );
};

export default Servizio;
