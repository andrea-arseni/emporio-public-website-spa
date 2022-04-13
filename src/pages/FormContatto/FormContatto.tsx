import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import useInput from "../../hooks/use-input";
import styles from "./FormContatto.module.css";
import { URL } from "../../env";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const FormContatto: React.FC<{
    type: "valutazione" | "domanda";
}> = (props) => {
    let inputDomandaIsInvalid = undefined;

    const navigate = useNavigate();

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }
        await executeRecaptcha();
    }, []);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputTelefonoRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputDomandaRef = useRef<HTMLTextAreaElement>(null);

    const {
        inputValue: inputNameValue,
        inputIsInvalid: inputNameIsInvalid,
        inputTouchedHandler: inputNameTouchedHandler,
        inputChangedHandler: inputNameChangedHandler,
        reset: inputNameReset,
    } = useInput((el) => el.toString().length > 5);

    const {
        inputValue: inputTelefonoValue,
        inputIsInvalid: inputTelefonoIsInvalid,
        inputTouchedHandler: inputTelefonoTouchedHandler,
        inputChangedHandler: inputTelefonoChangedHandler,
        reset: inputTelefonoReset,
    } = useInput((el) => el.toString().length > 9);

    const {
        inputValue: inputEmailValue,
        inputIsInvalid: inputEmailIsInvalid,
        inputTouchedHandler: inputEmailTouchedHandler,
        inputChangedHandler: inputEmailChangedHandler,
        reset: inputEmailReset,
    } = useInput((mail) => {
        const regexp = /\S+@\S+\.\S+/;
        return regexp.test(mail.toString());
    });

    const [privacyChecked, setPrivacyChecked] = useState(false);

    const privacyCheckHandler = () =>
        setPrivacyChecked((prevState) => !prevState);

    const [outlinePrivacy, setOutlinePrivacy] = useState(false);

    const outlinePrivacyHandler = () => {
        setOutlinePrivacy(true);
        setTimeout(() => setOutlinePrivacy(false), 500);
        setTimeout(() => setOutlinePrivacy(true), 1000);
        setTimeout(() => setOutlinePrivacy(false), 1500);
    };

    const isFormInvalid =
        inputNameValue.trim() === "" ||
        inputTelefonoValue.trim() === "" ||
        inputEmailValue.trim() === "" ||
        inputNameIsInvalid ||
        inputEmailIsInvalid ||
        inputTelefonoIsInvalid ||
        !privacyChecked ||
        (props.type === "domanda" && inputDomandaIsInvalid);

    const focusOnWrongInput = () => {
        if (inputNameValue.trim() === "" || inputNameIsInvalid) {
            inputNameRef.current!.focus();
            return;
        }
        if (inputTelefonoValue.trim() === "" || inputTelefonoIsInvalid) {
            inputTelefonoRef.current!.focus();
            return;
        }
        if (inputEmailValue.trim() === "" || inputEmailIsInvalid) {
            inputEmailRef.current!.focus();
            return;
        }
        outlinePrivacyHandler();
    };

    const [formCompleted, setFormCompleted] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        handleReCaptchaVerify();
        if (isFormInvalid) {
            focusOnWrongInput();
            return;
        }
        const reqBody = {
            nome: inputNameRef.current!.value,
            telefono: inputTelefonoRef.current!.value,
            email: inputEmailRef.current!.value,
            note: "Richiesta Valutazione Gratuita",
        };
        if (props.type === "domanda")
            reqBody.note = inputDomandaRef.current!.value
                ? "Domanda Generica: " + inputDomandaRef.current!.value
                : "Inviata Domanda ma non ha scritto niente";
        try {
            setIsLoading(true);
            await axios.post(URL + "persone/private", reqBody);
            setIsLoading(false);
            inputEmailReset();
            inputNameReset();
            inputTelefonoReset();
            setFormCompleted(true);
        } catch (error: any) {
            setIsLoading(false);
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Errore, invio dati non riuscito!");
            }
        }
    };

    return (
        <div className={`${styles.formWrapper} centered`}>
            {isLoading && <Spinner type="blue" />}
            {!isLoading && (
                <form
                    className={`${styles.form} ${
                        props.type === "valutazione"
                            ? styles.formValutazione
                            : styles.formDomanda
                    } centered`}
                >
                    <Input
                        type="text"
                        id="nome"
                        value={inputNameValue}
                        isInvalid={inputNameIsInvalid}
                        onChange={inputNameChangedHandler}
                        onBlur={inputNameTouchedHandler}
                        invalidMessage="Il nome è obbligatorio e deve avere almeno 5 caratteri"
                        ref={inputNameRef}
                    >
                        Nome e Cognome
                    </Input>
                    <Input
                        type="number"
                        id="telefono"
                        value={inputTelefonoValue}
                        isInvalid={inputTelefonoIsInvalid}
                        onChange={inputTelefonoChangedHandler}
                        onBlur={inputTelefonoTouchedHandler}
                        invalidMessage="Il numero è obbligatorio e deve avere almeno 9 cifre"
                        ref={inputTelefonoRef}
                    >
                        Numero di Telefono
                    </Input>
                    <Input
                        type="email"
                        id="email"
                        value={inputEmailValue}
                        isInvalid={inputEmailIsInvalid}
                        onChange={inputEmailChangedHandler}
                        onBlur={inputEmailTouchedHandler}
                        invalidMessage="Email mancante oppure non valida"
                        ref={inputEmailRef}
                    >
                        Indirizzo Email
                    </Input>
                    {props.type === "domanda" && (
                        <Input
                            type="textarea"
                            id="domanda"
                            value=""
                            ref={inputDomandaRef}
                        >
                            La mia domanda
                        </Input>
                    )}
                    <div className={styles.privacySection}>
                        <input
                            className={styles.privacyCheckButton}
                            type="checkbox"
                            id="privacy"
                            onChange={privacyCheckHandler}
                        />
                        <p
                            className={
                                outlinePrivacy
                                    ? styles.evidence
                                    : styles.notEvidence
                            }
                        >
                            <span style={{ fontSize: "bold" }}>Privacy:</span>{" "}
                            Autorizzo al trattamento dei dati sopra riportati in
                            conformità al D.Lgs. 196/2003. Maggiori info{" "}
                            <Link to="/privacy"> qui</Link>
                        </p>
                    </div>

                    <Button
                        color="blue"
                        onClick={submitForm}
                        disabled={isFormInvalid || isLoading}
                    >
                        {props.type === "valutazione"
                            ? "Richiedi Valutazione Gratuita"
                            : "Invia la Domanda"}
                    </Button>
                </form>
            )}
            {formCompleted &&
                ReactDOM.createPortal(
                    <Modal
                        header="Ottimo!"
                        text={[
                            `Abbiamo ricevuto la tua richiesta ${
                                props.type === "valutazione"
                                    ? `di valutazione gratuita`
                                    : ``
                            }!`,
                            `Ti ricontatteremo al più presto`,
                        ]}
                        buttons={[
                            {
                                message: "Torna alla Home",
                                color: "blue",
                                action: () => navigate("/home"),
                            },
                            {
                                message: "Vai agli Immobili",
                                color: "blue_outline",
                                action: () => navigate("/immobili"),
                            },
                        ]}
                    />,
                    document.querySelector("body")!
                )}
            {errorMessage &&
                ReactDOM.createPortal(
                    <Modal
                        header="Oh no!"
                        text={[errorMessage]}
                        buttons={[
                            {
                                message: "Riprova",
                                color: "red",
                                action: () => setErrorMessage(""),
                            },
                            {
                                message: "Vai agli Immobili",
                                color: "red_outline",
                                action: () => navigate("/immobili"),
                            },
                        ]}
                    />,
                    document.querySelector("body")!
                )}
        </div>
    );
};

export default FormContatto;
