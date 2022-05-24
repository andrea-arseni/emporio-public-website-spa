import { Fragment, useRef, useState } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import TextMessage from "../../components/TextMessage/TextMessage";
import Button from "../../components/UI/Button/Button";
import styles from "./Home.module.css";
import ImagesBackdrop from "../../components/ImagesBackdrop/ImagesBackdrop";

const Home: React.FC<{}> = () => {
    const formElement = useRef<HTMLInputElement>(null);

    const [isFormWithTextArea, setIsFormWithTextArea] = useState(false);

    const changeFormHandler = () => {
        setIsFormWithTextArea((prevState) => !prevState);
        formElement.current!.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const defaultMessage = (
        <Fragment>
            {" "}
            <h2 style={{ fontWeight: "normal" }}>
                Vuoi una valutazione gratuita?
            </h2>
            <p>
                Il primo passo per poter vendere o affittare con successo il
                proprio immobile è conoscere con precisione il suo valore di
                mercato.
                <br />
                Noi, lavorando nel mercato dal 1985, possiamo fornire sia una
                valutazione gratuita di un immobile che aiutarvi a risolvere
                dubbi ed a rispondere alle più variegate domande in tema
                immobiliare, in modo totalmente gratuito e senza impegno.
            </p>
            <div className={styles.buttons}>
                <Button color="blue" onClick={changeFormHandler}>
                    {isFormWithTextArea ? "Togli la nota" : "Aggiungi una nota"}
                </Button>
            </div>
        </Fragment>
    );

    return (
        <Fragment>
            <div className={`page row`}>
                <div className="col-6 centered">
                    <TextMessage>{defaultMessage}</TextMessage>
                </div>
                <div className="col-6 centered">
                    <ContactForm
                        ref={formElement}
                        isTextAreaVisible={isFormWithTextArea}
                    />
                </div>
            </div>
            <ImagesBackdrop />
        </Fragment>
    );
};

export default Home;
