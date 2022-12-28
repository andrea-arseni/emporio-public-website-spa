import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
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
import { color } from "../UI/Button/Button";
import { capitalize } from "../../utils/stringHandler";
import { URL } from "../../env";
import useWindowSize from "../../hooks/use-size";

const ContactForm: React.FC<{
    little?: boolean;
}> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [width] = useWindowSize();

    const houses = useSelector((state: RootState) => state.houses.houses);

    const formatService = (input: string) =>
        input
            .split("-")
            .map((el) => capitalize(el))
            .join(" ");

    const getPageType = () => {
        if (
            location.pathname.includes("/immobili/") ||
            location.pathname.includes("/servizi/")
        ) {
            return "specific-large";
        } else if (
            location.search.substring(1).includes("immobileId") ||
            location.search.substring(1).includes("servizio")
        ) {
            return "specific-small";
        }
        return "generic";
    };

    const getNoteText = () => {
        // if path contains /immobili/ then take key
        if (location.pathname.includes("/immobili/")) {
            const id = location.pathname.split("/").pop();
            const ref = houses.find((el) => el.id === +id!)?.ref;
            return "Interessamento all'immobile con Ref. " + ref;
            // if path contains /servizi/ then take key
        } else if (location.pathname.includes("/servizi/")) {
            let servizio = location.pathname.split("/").pop();
            return "Interessamento per servizio - " + formatService(servizio!);
        } else {
            const queryParams = location.search.substring(1).split("&");
            if (queryParams.find((el) => el.includes("immobileId"))) {
                const id = queryParams
                    .find((el) => el.includes("immobileId"))
                    ?.split("=")[1];
                const ref = houses.find((el) => el.id === +id!)?.ref;
                return "Interessamento all'immobile con Ref. " + ref;
            } else if (queryParams.find((el) => el.includes("servizio"))) {
                const servizio = queryParams
                    .find((el) => el.includes("servizio"))
                    ?.split("=")[1];
                return (
                    "Interessamento per servizio - " + formatService(servizio!)
                );
            }
        }
        return "Contatto generico";
    };

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
        inputNameValue.trim() === "" ||
        inputNameIsInvalid ||
        inputEmailIsInvalid ||
        inputTelefonoIsInvalid;

    const [formCompleted, setFormCompleted] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const [errorAction, setErrorAction] = useState<(() => void) | null>(null);

    const resetForm = () => {
        inputEmailReset();
        inputNameReset();
        inputTelefonoReset();
    };

    const setNullIfEmpty = (input: string) =>
        input.trim().length === 0 ? null : input.trim();

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isFormInvalid) {
            if (inputNameValue.trim() === "") {
                setErrorAction(() => () => inputNameRef.current!.focus());
                setErrorMessage("Nome obbligatorio");
            } else if (inputNameIsInvalid) {
                setErrorAction(() => () => inputNameRef.current!.focus());
                setErrorMessage("Nome da correggere");
            } else if (inputTelefonoIsInvalid) {
                setErrorAction(() => () => inputTelefonoRef.current?.focus());
                setErrorMessage("Telefono da correggere");
            } else if (inputEmailIsInvalid) {
                setErrorAction(() => () => inputEmailRef.current?.focus());
                setErrorMessage("Email da correggere");
            } else if (
                inputTelefonoValue.trim() === "" &&
                inputEmailValue.trim() === ""
            ) {
                setErrorAction(() => () => inputTelefonoRef.current?.focus());
                setErrorMessage("Inserire almeno uno tra telefono ed email");
            }
            return;
        }

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

        reqBody.note = getNoteText();

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

    const getErrorModalButtons = () => {
        return !errorAction
            ? [
                  {
                      message: "Riprova",
                      color: "red" as color,
                      action: () => {
                          setErrorMessage("");
                          privacyCheckHandler();
                      },
                  },
                  {
                      message: "Ricomincia",
                      color: "red_outline" as color,
                      action: () => {
                          setErrorMessage("");
                          resetForm();
                          privacyCheckHandler();
                      },
                  },
              ]
            : [
                  {
                      message: "Ok",
                      color: "blue_outline" as color,
                      action: () => {
                          errorAction!();
                          setErrorMessage("");
                          setErrorAction(null);
                      },
                  },
              ];
    };

    const errorModal = (
        <Modal
            header="Attenzione!"
            text={[errorMessage]}
            buttons={getErrorModalButtons()}
        />
    );

    const successButtons: {
        message: string;
        color: color;
        action: () => void;
    }[] =
        getPageType() !== "generic"
            ? [
                  {
                      message: "Chiudi",
                      color: "blue",
                      action: () => {
                          if (getPageType() === "specific-large") {
                              resetForm();
                              setFormCompleted(false);
                          } else {
                              navigate(-1);
                          }
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
                    {props.little &&
                        !inputNameIsInvalid &&
                        !inputEmailIsInvalid &&
                        !inputTelefonoIsInvalid && (
                            <h5 className={styles.title}>
                                Ti interessa? Contattaci!
                            </h5>
                        )}
                    <Input
                        little={props.little}
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
                        little={props.little}
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
                        little={props.little}
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
                    {!props.little && (
                        <Button
                            color="blue_outline"
                            onClick={(e: FormEvent) => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                        >
                            Indietro
                        </Button>
                    )}
                </form>
            )}
            {formCompleted &&
                ReactDOM.createPortal(
                    successModal,
                    document.querySelector("body")!
                )}
            {errorMessage &&
                ReactDOM.createPortal(
                    errorModal,
                    document.querySelector("body")!
                )}
        </div>
    );
};

export default ContactForm;
