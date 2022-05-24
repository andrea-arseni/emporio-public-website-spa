import { services } from "../../static-data/services";
import ContactForm from "../../components/ContactForm/ContactForm";
import TextMessage from "../../components/TextMessage/TextMessage";
import { Fragment, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import styles from "./Servizio.module.css";

const Servizio: React.FC<{}> = () => {
    const formElement = useRef<HTMLInputElement>(null);

    const [isFormWithTextArea, setIsFormWithTextArea] = useState(false);

    const changeFormHandler = () => {
        setIsFormWithTextArea((prevState) => !prevState);
        formElement.current!.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const location = useLocation();

    const key = location.pathname.split("/").pop();

    let serviceTitle = null;
    let serviceMessage = null;

    const service = services.find((el) => el.name === key);
    try {
        serviceTitle = (
            <h2 style={{ fontWeight: "normal" }}>{service!.title}</h2>
        );
        const textArray = service!.message;
        serviceMessage = textArray.map((el, index) => <p key={index}>{el}</p>);
    } catch (e) {
        return <Navigate to="/" />;
    }

    return (
        <Fragment>
            <div className={`page row blue`}>
                <div className="col-6 centered">
                    <TextMessage>
                        {serviceTitle}
                        {serviceMessage}
                        <div className={styles.buttons}>
                            <Button color="blue" onClick={changeFormHandler}>
                                {isFormWithTextArea
                                    ? "Togli la nota"
                                    : "Aggiungi una nota"}
                            </Button>
                        </div>
                    </TextMessage>
                </div>
                <div className="col-6 centered">
                    <ContactForm
                        ref={formElement}
                        isTextAreaVisible={isFormWithTextArea}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Servizio;
