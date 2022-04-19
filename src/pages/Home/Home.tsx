import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { services } from "../../static-data/services";
import Form from "../../components/Form/Form";
import TextMessage from "../../components/TextMessage/TextMessage";
import Button from "../../components/UI/Button/Button";
import styles from "./Home.module.css";

const Home: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [isFormWithTextArea, setIsFormWithTextArea] = useState(false);

    const changeFormHandler = () =>
        setIsFormWithTextArea((prevState) => !prevState);

    const defaultMessage = (
        <Fragment>
            {" "}
            <h2>Vuoi una valutazione gratuita?</h2>
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
                    {isFormWithTextArea
                        ? "Torna come prima"
                        : "Vorrei Fare una Domanda"}
                </Button>
            </div>
        </Fragment>
    );

    const key = location.pathname.split("/").pop();

    let serviceMessage = null;

    if (key !== "home") {
        const service = services.find((el) => el.name === key);
        try {
            const textArray = service!.message;
            serviceMessage = textArray.map((el, index) => (
                <p key={index}>{el}</p>
            ));
        } catch (e) {
            navigate("/");
        }
    }

    const indexesImages = ["one", "two", "three", "four", "five"];
    const classes = [];

    for (let i = 0; i < 5; i++) {
        classes.push(`${styles.heroImage} ${styles[indexesImages[i]]}`);
    }

    const images = classes.map((el) => <div key={el} className={el}></div>);

    return (
        <div className={`page row ${serviceMessage ? styles.blue : ""}`}>
            <div className={styles.jumbotron}>
                <TextMessage>
                    {serviceMessage ? serviceMessage : defaultMessage}
                </TextMessage>
            </div>
            <Form
                isTextAreaVisible={isFormWithTextArea}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            {!serviceMessage && images}
        </div>
    );
};

export default Home;
