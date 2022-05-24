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
import { cleanPhoneNumber } from "../../utils/numberHandler";

type FormType = "valutazione-gratuita" | "servizio" | "immobile";

const Form: React.FC<{
    isTextAreaVisible?: boolean;
    ref?: React.Ref<any>;
}> = React.forwardRef((props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationParts = location.pathname.split("/");

    let formType: FormType = "valutazione-gratuita";
    if (location.pathname.includes("servizi")) {
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
    } = useInput(
        (el) =>
            el.toString().trim().length >= 5 &&
            el.toString().trim().length <= 20
    );

    const {
        inputValue: inputTelefonoValue,
        inputIsInvalid: inputTelefonoIsInvalid,
        inputTouchedHandler: inputTelefonoTouchedHandler,
        inputChangedHandler: inputTelefonoChangedHandler,
        reset: inputTelefonoReset,
    } = useInput((el) => {
        const res = cleanPhoneNumber(el);
        const cifre = res.toString().slice(1);
        return res.toString().length > 9 && /^\d+$/.test(cifre);
    });

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

    const {
        inputValue: inputNotesValue,
        inputChangedHandler: inputNotesChangedHandler,
        reset: inputNotesReset,
    } = useInput(() => true);

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
        !privacyChecked;

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

    const resetForm = () => {
        inputEmailReset();
        inputNameReset();
        inputTelefonoReset();
        inputNotesReset();
    };

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        handleReCaptchaVerify();
        if (isFormInvalid) {
            focusOnWrongInput();
            return;
        }
        const reqBody = {
            nome: inputNameRef.current!.value.trim(),
            telefono: cleanPhoneNumber(inputTelefonoRef.current!.value),
            email: inputEmailRef.current!.value.trim(),
            note: "Richiesta Valutazione Gratuita",
        };
        if (formType === "servizio") {
            reqBody.note = key!.replace("-", " ");
        } else if (formType === "immobile") {
            reqBody.note = `Contatto per immobile con ref. ${refImmobile}`;
        }

        if (props.isTextAreaVisible) {
            reqBody.note =
                reqBody.note +
                (inputDomandaRef.current!.value
                    ? ": " + inputDomandaRef.current!.value
                    : "");
        }

        try {
            setIsLoading(true);
            await axios.post(URL + "persone/private", reqBody);
            setIsLoading(false);
            resetForm();
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
                        props.isTextAreaVisible
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
                        invalidMessage="tra 5 e 20 caratteri"
                        ref={inputNameRef}
                    >
                        Nome e Cognome
                    </Input>
                    <Input
                        type="text"
                        id="telefono"
                        value={inputTelefonoValue}
                        isInvalid={inputTelefonoIsInvalid}
                        onChange={inputTelefonoChangedHandler}
                        onBlur={inputTelefonoTouchedHandler}
                        invalidMessage="formato invalido (almeno 9 cifre)"
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
                    {props.isTextAreaVisible && (
                        <Input
                            value={inputNotesValue}
                            onChange={inputNotesChangedHandler}
                            type="textarea"
                            id="domanda"
                            ref={inputDomandaRef}
                        >
                            La tua nota
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
                        Invia
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
                                message: "Indietro",
                                color: "blue",
                                action: () => setFormCompleted(false),
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
                                action: () => {
                                    setErrorMessage("");
                                    privacyCheckHandler();
                                },
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
