import axios from "axios";
import React, { Fragment, useCallback, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Modal from "../Modal/Modal";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./ContactForm.module.css";
import { URL } from "../../env";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type FormType = "domanda" | "valutazione-gratuita" | "servizio" | "immobile";

const Form: React.FC<{
    isTextAreaVisible?: boolean;
    ref?: React.Ref<any>;
}> = React.forwardRef((props, ref) => {
    let inputDomandaIsInvalid = undefined;

    const navigate = useNavigate();
    const location = useLocation();
    const locationParts = location.pathname.split("/");

    let formType: FormType = "valutazione-gratuita";
    if (props.isTextAreaVisible) {
        formType = "domanda";
    } else if (location.pathname.includes("servizio")) {
        formType = "servizio";
    } else if (location.pathname.includes("immobili")) {
        formType = "immobile";
    }

    const key = locationParts.pop();

    let refImmobile = useSelector(
        (state: RootState) =>
            state.houses.houses.find((el) => el.id.toString() === key)?.ref
    );

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }
        await executeRecaptcha();
    }, [executeRecaptcha]);

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

    const [isLoading, setIsLoading] = useState(false);

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
        (formType === "domanda" && inputDomandaIsInvalid);

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
        if (formType === "domanda") {
            reqBody.note = inputDomandaRef.current!.value
                ? "Domanda Generica: " + inputDomandaRef.current!.value
                : "Inviata Domanda ma non ha scritto niente";
        } else if (formType === "servizio") {
            reqBody.note = key!.replace("-", " ");
        } else if (formType === "immobile") {
            reqBody.note = `Contatto per immobile con ref. ${refImmobile}`;
        }

        try {
            setIsLoading(true);
            await axios.post(URL + "persone/private", reqBody);
            setIsLoading(false);
            inputEmailReset();
            inputNameReset();
            inputTelefonoReset();
            privacyCheckHandler();
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
        <Fragment>
            {isLoading && <Spinner type="white" />}
            {!isLoading && (
                <form
                    className={`${styles.form} ${
                        formType === "domanda"
                            ? styles.formDomanda
                            : styles.formValutazione
                    } centered`}
                >
                    {refImmobile && (
                        <h3 className={styles.title}>
                            Ti interessa? Contattaci
                        </h3>
                    )}
                    <Input
                        type="text"
                        id="nome"
                        value={inputNameValue}
                        isInvalid={inputNameIsInvalid}
                        onChange={inputNameChangedHandler}
                        onBlur={inputNameTouchedHandler}
                        invalidMessage="almeno 5 caratteri"
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
                        invalidMessage="almeno 9 cifre"
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
                        invalidMessage="mancante o invalida"
                        ref={inputEmailRef}
                    >
                        Indirizzo Email
                    </Input>
                    {formType === "domanda" && (
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
                        disabled={isFormInvalid}
                    >
                        {formType === "domanda" && "Invia la domanda"}
                        {formType === "valutazione-gratuita" &&
                            "Richiedi la valutazione gratuita"}
                        {formType === "servizio" &&
                            "Richiedi assistenza per il servizio"}
                        {formType === "immobile" &&
                            "Richiedi visita per l'immobile"}
                    </Button>
                    <div ref={ref}></div>
                </form>
            )}
            {formCompleted &&
                ReactDOM.createPortal(
                    <Modal
                        header="Ottimo!"
                        text={[
                            `Abbiamo ricevuto la tua richiesta ${
                                formType === "valutazione-gratuita"
                                    ? `di valutazione gratuita`
                                    : ``
                            }!`,
                            `Ti ricontatteremo al più presto`,
                        ]}
                        buttons={[
                            {
                                message: "Torna alla Home",
                                color: "blue",
                                action: () =>
                                    formType === "immobile" ||
                                    formType === "servizio"
                                        ? navigate("/home")
                                        : setFormCompleted(false),
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
        </Fragment>
    );
});

export default Form;
