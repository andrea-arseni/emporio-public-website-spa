import axios from "axios";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Modal from "../Modal/Modal";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./ContactForm.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { cleanPhoneNumber } from "../../utils/numberHandler";
import useWindowSize from "../../hooks/use-size";
import { color } from "../UI/Button/Button";
import { capitalize } from "../../utils/stringHandler";
import { URL } from "../../env";

const ContactForm: React.FC<{
    local?: boolean;
    little?: boolean;
}> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isImmobileQueryParamPresent = location.search.includes("immobileId");

    const getIdImmobile = () => {
        const queryParams = location.search.split("&");
        return queryParams
            .find((el) => el.includes("immobileId"))!
            .split("=")[1];
    };

    const getNoteText = (
        refImmobile: number | undefined,
        key: string | undefined
    ) => {
        if (refImmobile)
            return "Interessamento all'immobile con Ref. " + refImmobile;
        if (location.pathname.includes("servizi")) {
            return `Interessamento per servizio 
                (${key
                    ?.split("-")
                    .map((el) => capitalize(el))
                    .join(" ")})`;
        }
        return "Interessamento generico";
    };

    const [width] = useWindowSize();

    const locationParts = location.pathname.split("/");
    const key = isImmobileQueryParamPresent
        ? getIdImmobile()
        : locationParts.pop();

    let refImmobile = useSelector(
        (state: RootState) =>
            state.houses.houses.find((el) => el.id.toString() === key)?.ref
    );

    const { executeRecaptcha } = useGoogleReCaptcha();

    const inputNameRef = useRef<HTMLInputElement>(null);
    const inputTelefonoRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);

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
        if (!el || el.toString().trim().length === 0) return true;
        const res = cleanPhoneNumber(el);
        const cifre = res.toString().slice(1);
        return res.toString().length >= 9 && /^\d+$/.test(cifre);
    });

    const {
        inputValue: inputEmailValue,
        inputIsInvalid: inputEmailIsInvalid,
        inputTouchedHandler: inputEmailTouchedHandler,
        inputChangedHandler: inputEmailChangedHandler,
        reset: inputEmailReset,
    } = useInput((email) => {
        if (!email || email.toString().trim().length === 0) return true;
        const regexp = /\S+@\S+\.\S+/;
        return regexp.test(email.toString());
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);

    const privacyCheckHandler = () =>
        setPrivacyChecked((prevState) => !prevState);

    const [outlinePrivacy, setOutlinePrivacy] = useState<boolean>(false);

    const outlinePrivacyHandler = () => {
        setOutlinePrivacy(true);
        setTimeout(() => setOutlinePrivacy(false), 500);
        setTimeout(() => setOutlinePrivacy(true), 1000);
        setTimeout(() => setOutlinePrivacy(false), 1500);
    };

    const isFormInvalid =
        (inputTelefonoValue.trim() === "" && inputEmailValue.trim() === "") ||
        inputNameIsInvalid ||
        inputEmailIsInvalid ||
        inputTelefonoIsInvalid;

    const [formCompleted, setFormCompleted] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const resetForm = () => {
        inputEmailReset();
        inputNameReset();
        inputTelefonoReset();
    };

    const setNullIfEmpty = (input: string) =>
        input.trim().length === 0 ? null : input.trim();

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isFormInvalid) return;

        if (!privacyChecked) {
            outlinePrivacyHandler();
            return;
        }

        const reqBody = {
            nome: inputNameRef.current!.value.trim(),
            telefono: setNullIfEmpty(
                cleanPhoneNumber(inputTelefonoRef.current!.value)
            ),
            email: setNullIfEmpty(inputEmailRef.current!.value.trim()),
            note: "Contatto generico",
        };

        reqBody.note = getNoteText(refImmobile, key);

        const recaptchaToken = await executeRecaptcha!("login");

        try {
            setIsLoading(true);
            const headers = {
                recaptchaToken,
                "Content-Type": "application/json",
            };
            await axios.post(URL + "persone/private", reqBody, { headers });
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

    const errorModal = (
        <Modal
            local={props.local}
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
                    message: "Ricomincia",
                    color: "red_outline",
                    action: () => {
                        setErrorMessage("");
                        resetForm();
                        privacyCheckHandler();
                    },
                },
            ]}
        />
    );

    const successButtons: {
        message: string;
        color: color;
        action: () => void;
    }[] = refImmobile
        ? [
              {
                  message: "Chiudi",
                  color: "blue",
                  action: () => {
                      resetForm();
                      setFormCompleted(false);
                  },
              },
          ]
        : [
              {
                  message: width > 720 ? "Vai alla Home" : "Home",
                  color: "blue",
                  action: () => navigate("/"),
              },
              {
                  message: width > 720 ? "Vai agli Immobili" : "Immobili",
                  color: "blue_outline",
                  action: () => navigate("/immobili"),
              },
          ];

    const successModal = (
        <Modal
            local={props.local}
            header="Ottimo!"
            text={[
                `Abbiamo ricevuto la tua richiesta!`,
                `Ti ricontatteremo al più presto`,
            ]}
            buttons={successButtons}
        />
    );

    return (
        <div className={styles.frame}>
            {isLoading && (
                <div className="fullHeight fullWidth centered">
                    <Spinner type="blue" />
                </div>
            )}
            {!isLoading && (
                <form
                    className={`${styles.form} ${
                        props.little ? styles.little : styles.big
                    }  centered`}
                >
                    {refImmobile && (
                        <h5 className={styles.title}>
                            Ti interessa? <br /> Contattaci
                        </h5>
                    )}
                    <Input
                        type="text"
                        id="nome"
                        value={inputNameValue}
                        isInvalid={inputNameIsInvalid}
                        onChange={inputNameChangedHandler}
                        onBlur={inputNameTouchedHandler}
                        invalidMessage={
                            inputNameValue.toString().trim().length === 0
                                ? "Obbligatorio"
                                : inputNameValue.toString().trim().length < 5
                                ? "Troppo Corto"
                                : "Troppo Lungo"
                        }
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
                        invalidMessage="formato invalido"
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
                        invalidMessage="formato invalido"
                        ref={inputEmailRef}
                    >
                        Indirizzo Email
                    </Input>
                    <div
                        className={`centered ${styles.privacySection} ${
                            outlinePrivacy
                                ? styles.evidence
                                : styles.notEvidence
                        }`}
                    >
                        <div className={styles.privacyButtonArea}>
                            <input
                                className={`${styles.privacyCheckButton} form-check-input`}
                                type="checkbox"
                                id="privacy"
                                onChange={privacyCheckHandler}
                            />
                        </div>
                        <div className={styles.privacyTextArea}>
                            <p>
                                <span style={{ fontSize: "bold" }}>
                                    Privacy:
                                </span>{" "}
                                Autorizzo al trattamento dei dati sopra
                                riportati in conformità al D.Lgs. 196/2003.
                                Maggiori info <Link to="/privacy"> qui</Link>
                            </p>
                        </div>
                    </div>
                    <Button
                        color="blue"
                        onClick={submitForm}
                        disabled={isFormInvalid}
                    >
                        Invia
                    </Button>
                </form>
            )}
            {formCompleted && props.local && successModal}
            {formCompleted &&
                !props.local &&
                ReactDOM.createPortal(
                    successModal,
                    document.querySelector("body")!
                )}
            {errorMessage && props.local && errorModal}
            {errorMessage &&
                !props.local &&
                ReactDOM.createPortal(
                    errorModal,
                    document.querySelector("body")!
                )}
        </div>
    );
};

export default ContactForm;
