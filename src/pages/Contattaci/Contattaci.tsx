import ContactForm from "../../components/ContactForm/ContactForm";
import ImagesBackdrop from "../../components/ImagesBackdrop/ImagesBackdrop";
import styles from "./Contattaci.module.css";

const Contattaci: React.FC<{ background?: boolean; local?: boolean }> = (
    props
) => {
    return (
        <div
            className={`page container-fluid text-center fullHeight ${
                !props.background ? styles.gradient : ""
            }`}
        >
            <div className="row fullHeight">
                <div className="col-xs-10 col-sm-8 col-md-6 offset-xs-1 offset-sm-2 offset-md-3 centered fullHeight">
                    <ContactForm local={props.local} />
                </div>
            </div>
            {props.background && <ImagesBackdrop />}
        </div>
    );
};

export default Contattaci;
