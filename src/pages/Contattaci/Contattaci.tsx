import { useLocation } from "react-router-dom";
import ContactForm from "../../components/ContactForm/ContactForm";
import ImagesBackdrop from "../../components/ImagesBackdrop/ImagesBackdrop";
import styles from "./Contattaci.module.css";

const Contattaci: React.FC<{}> = () => {
    const location = useLocation();

    const isBackdropVisible = location.search
        .substring(1)
        .split("&")
        .find((el) => el.toLowerCase() === "background=true");

    return (
        <div
            className={`page container-fluid text-center fullHeight ${styles.gradient}`}
        >
            <div className="row fullHeight">
                <div className="col-xs-10 col-sm-8 col-md-6 offset-xs-1 offset-sm-2 offset-md-3 centered fullHeight">
                    <ContactForm />
                </div>
            </div>
            {isBackdropVisible && <ImagesBackdrop />}
        </div>
    );
};

export default Contattaci;
