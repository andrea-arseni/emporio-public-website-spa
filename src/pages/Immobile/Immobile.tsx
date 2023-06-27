import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../env";
import {
    addFiles,
    addCaratteristiche,
    addHouses,
} from "../../store/houses-slice";
import { stringifyNumber } from "../../utils/numberHandler";
import styles from "./Immobile.module.css";
import { RootState } from "../../store";
import axios from "axios";
import ContactForm from "../../components/ContactForm/ContactForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import FeaturesWrapper from "../../components/FeaturesWrapper/FeaturesWrapper";
import { ReactComponent as EuroIcon } from "../../assets/icons/euro.svg";
import { ReactComponent as SquareMetersIcon } from "../../assets/icons/planimetry.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/house.svg";
import HousePhoto from "../../components/HousePhoto/HousePhoto";
import ErrorPage from "../Error/Error";
import useWindowSize from "../../hooks/use-size";
import {
    capitalize,
    capitalizeAllWords,
    correctZona,
} from "../../utils/stringHandler";

export type FeatureField = {
    value: string;
    label: string;
};

const Immobile: React.FC<{}> = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const [width] = useWindowSize();

    const navigate = useNavigate();

    const id = Number.parseInt(
        location.pathname.split("?")[0].split("/").pop()!
    );

    const house = useSelector((state: RootState) =>
        state.houses.houses.find((el) => el.id === id)
    );

    const [isLoading, setIsLoading] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        const fetchImmobile = async () => {
            try {
                const res = await axios.get(URL + "immobili/" + id);
                if (!house) {
                    dispatch(addHouses([res.data]));
                    return;
                }
                if (house && !house.caratteristicheImmobile)
                    dispatch(
                        addCaratteristiche({
                            id,
                            caratteristiche: res.data.caratteristicheImmobile,
                        })
                    );
                if (house && !house.fileFetched)
                    dispatch(addFiles({ id, files: res.data.files }));
                setIsLoading(false);
            } catch (e: any) {
                setIsLoading(false);
                if (e.response && e.response.data.message.includes("trovato")) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage(
                        "Errore nella richiesta, operazione fallita"
                    );
                }
            }
        };

        fetchImmobile();
    }, [dispatch, id, house]);

    if (errorMessage) return <ErrorPage message={errorMessage} />;

    const isSpecified = (valore: string | null | undefined | number) =>
        valore &&
        valore.toString().trim().toLowerCase() !== "undefined" &&
        valore.toString().trim().toLowerCase() !== "null";

    const displayNonSpecificatoSeAssente = (
        valore: any,
        finalLetter: "o" | "i" | "a" | "e" = "o"
    ) => (isSpecified(valore) ? valore : `Non specificat${finalLetter}`);

    let caratteristiche: {
        principali: FeatureField[];
        efficienzaEnergetica: FeatureField[];
        costruzione: FeatureField[];
        specifiche: FeatureField[];
        pertinenze: FeatureField[];
        impianti: FeatureField[];
        serramenti: FeatureField[];
        spese: FeatureField[];
        locazione: FeatureField[];
    } = {
        principali: [],
        efficienzaEnergetica: [],
        costruzione: [],
        specifiche: [],
        pertinenze: [],
        impianti: [],
        serramenti: [],
        spese: [],
        locazione: [],
    };

    if (house) {
        if (isSpecified(house.categoria) && isSpecified(house.contratto)) {
            caratteristiche.principali.push({
                value: `${capitalize(house.contratto)} di immobile ${
                    house.categoria
                }`,
                label: "Categoria",
            });
        }
        const tipologia = house.tipologia;
        if (
            tipologia &&
            tipologia !== "box" &&
            tipologia !== "camera singola" &&
            tipologia !== "loft" &&
            tipologia !== "posto auto" &&
            tipologia !== "posto letto in camera condivisa" &&
            tipologia !== "uffici open space" &&
            isSpecified(house.locali)
        ) {
            caratteristiche.principali.push({
                value: `${house.locali}`,
                label: "Locali",
            });
        }
        if (isSpecified(house.stato)) {
            caratteristiche.principali.push({
                value: `${house.stato} ${
                    house.libero ? `(Libero ${house.libero.toLowerCase()})` : ""
                }`,
                label: "Stato dell'immobile",
            });
        }
        if (isSpecified(house.indirizzo)) {
            caratteristiche.principali.push({
                value: `${capitalizeAllWords(house.indirizzo)}`,
                label: "Indirizzo",
            });
        }

        if (isSpecified(house.comune)) {
            caratteristiche.principali.push({
                value: `${capitalizeAllWords(house.comune)} ${
                    house.zona ? `(${correctZona(house.zona)})` : ""
                }`,
                label: "Comune",
            });
        }
    }

    if (house && house.caratteristicheImmobile) {
        caratteristiche.efficienzaEnergetica = [];

        if (isSpecified(house.classeEnergetica)) {
            caratteristiche.efficienzaEnergetica.push({
                value: `${
                    house.classeEnergetica.toUpperCase() === "ESENTE"
                        ? "Esente"
                        : capitalize(house.classeEnergetica.trim())
                }${
                    house.classeEnergetica.toUpperCase() !== "ESENTE"
                        ? ` ${
                              house.consumo > 0 && house.consumo < 175
                                  ? house.consumo
                                  : `> 175`
                          } kWh/m² anno`
                        : ""
                }`,
                label: "Classe energetica",
            });
        } else {
            caratteristiche.efficienzaEnergetica.push({
                value: "Non Specificata",
                label: "Classe Energetica",
            });
        }

        if (isSpecified(house.riscaldamento)) {
            caratteristiche.efficienzaEnergetica.push({
                value: `${house.riscaldamento} ${
                    isSpecified(house.caratteristicheImmobile.combustibile)
                        ? `(Combustibile ${house.caratteristicheImmobile.combustibile.toLowerCase()})`
                        : ""
                }`,
                label: "Riscaldamento",
            });
        } else {
            caratteristiche.efficienzaEnergetica.push({
                value: "Non Specificato",
                label: "Riscaldamento",
            });
        }

        if (
            house.riscaldamento &&
            house.riscaldamento.trim().toLowerCase() === "autonomo" &&
            isSpecified(house.caratteristicheImmobile.speseRiscaldamento)
        ) {
            caratteristiche.efficienzaEnergetica.push({
                value:
                    house.caratteristicheImmobile.speseRiscaldamento +
                    " €/mese",
                label: "Spese riscaldamento",
            });
        }
        if (isSpecified(house.caratteristicheImmobile.ariaCondizionata)) {
            caratteristiche.efficienzaEnergetica.push({
                value: house.caratteristicheImmobile.ariaCondizionata,
                label: "Aria condizionata",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.annoCostruzione)) {
            caratteristiche.costruzione.push({
                value: house.caratteristicheImmobile.annoCostruzione.toString(),
                label: "Anno di costruzione dell'immobile",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.cablato)) {
            caratteristiche.costruzione.push({
                value: house.caratteristicheImmobile.cablato,
                label: "Cablato",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.citofono)) {
            caratteristiche.costruzione.push({
                value: house.caratteristicheImmobile.citofono,
                label: "Citofono",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.portineria)) {
            caratteristiche.costruzione.push({
                value: house.caratteristicheImmobile.portineria,
                label: "Portineria",
            });
        }

        caratteristiche.costruzione.push({
            value: house.caratteristicheImmobile.ascensore
                ? "Presente"
                : "Non presente",
            label: "Ascensore",
        });

        if (isSpecified(house.piano)) {
            let piano = house.piano;
            if (piano.length === 1) piano = piano + "°";
            caratteristiche.specifiche.push({
                value: `${piano} (${
                    house.caratteristicheImmobile.ascensore ? `Con` : "Senza"
                } ascensore)`,
                label: "Piano",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.esposizione)) {
            caratteristiche.specifiche.push({
                value: capitalizeAllWords(
                    house.caratteristicheImmobile.esposizione
                ),
                label: "Esposizione",
            });
        }

        const checkPresence = (value: string) =>
            value.trim() === "0" ? "Non Presenti" : value.toString();

        if (isSpecified(house.caratteristicheImmobile.balconi)) {
            caratteristiche.specifiche.push({
                value: checkPresence(house.caratteristicheImmobile.balconi),
                label: "Balconi",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.terrazzi)) {
            caratteristiche.specifiche.push({
                value: checkPresence(house.caratteristicheImmobile.terrazzi),
                label: "Terrazzi",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.antifurto)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.antifurto,
                label: "Antifurto",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.altezza)) {
            const altezza: number = +house.caratteristicheImmobile.altezza;
            caratteristiche.specifiche.push({
                value: altezza.toFixed(2) + " metri",
                label: "Altezza",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.arredamento)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.arredamento,
                label: "Arredamento",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.mansarda)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.mansarda,
                label: "Mansarda",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.taverna)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.taverna,
                label: "Taverna",
            });
        }

        caratteristiche.specifiche.unshift({
            value: house.caratteristicheImmobile.portaBlindata
                ? "Blindata"
                : "Non blindata",
            label: "Porta d'ingresso",
        });

        if (
            house.caratteristicheImmobile.livelli &&
            house.caratteristicheImmobile.livelli > 1
        ) {
            caratteristiche.specifiche.unshift({
                value: `L'immobile si distribuisce su ${house.caratteristicheImmobile.livelli} livelli`,
                label: "Livelli",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.proprieta)) {
            caratteristiche.specifiche.unshift({
                value: house.caratteristicheImmobile.proprieta,
                label: "Proprietà",
            });
        }

        caratteristiche.pertinenze = [
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.box
                ),
                label: "Box",
            },
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.cantina
                ),
                label: "Cantina",
            },
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.giardino
                ),
                label: "Giardino",
            },
        ];
        caratteristiche.serramenti = [
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.serramentiInterni
                ),
                label: "Serramenti interni",
            },
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.serramentiEsterni
                ),
                label: "Serramenti esterni",
            },
        ];
        caratteristiche.impianti = [
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.impiantoElettrico
                ),
                label: "Impianto elettrico",
            },
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.impiantoIdraulico
                ),
                label: "Impianto idraulico",
            },
        ];
        caratteristiche.spese = [
            {
                value: house.caratteristicheImmobile.speseCondominiali
                    ? `${house.caratteristicheImmobile.speseCondominiali} € al mese circa`
                    : "Non sono previste spese di gestione",
                label: "Spese condominiali",
            },
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.speseExtra,
                    "e"
                ),
                label: "Spese extra",
            },
        ];

        if (
            house.caratteristicheImmobile.categoriaCatastale &&
            house.caratteristicheImmobile.rendita
        ) {
            caratteristiche.spese.unshift({
                value: `${
                    house.caratteristicheImmobile.categoriaCatastale
                } (${stringifyNumber(
                    house.caratteristicheImmobile.rendita
                )} €/anno)`,
                label: "Categoria catastale e rendita catastale",
            });
        }

        caratteristiche.locazione = [
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.cauzione
                ),
                label: "Cauzione necessaria all'ingresso",
            },
            {
                value: displayNonSpecificatoSeAssente(
                    house.caratteristicheImmobile.tipoContratto
                ),
                label: "Tipo contratto",
            },
        ];
        if (
            house.contratto === "affitto" &&
            house.categoria === "commerciale" &&
            house.caratteristicheImmobile.reception
        )
            caratteristiche.locazione.push({
                value: house.caratteristicheImmobile.reception,
                label: "Reception",
            });
    }

    const testoACapo = (text: string) => {
        const res = text.split("\n");
        return (
            <div>
                {res.map((el, index) =>
                    el ? (
                        <span key={el}>{el}</span>
                    ) : (
                        <div key={index}>
                            <br />
                        </div>
                    )
                )}
            </div>
        );
    };

    const elaborateDescrizione = (descrizione: string) => {
        if (!descrizione) return "";
        if (!descrizione.includes("href")) return testoACapo(descrizione);
        const link = descrizione.split("href='")[1].split("'")[0];
        const primaParte = descrizione.split("<a")[0];
        const secondaParte = descrizione.split("</a>")[1];
        return (
            <div>
                {testoACapo(primaParte)}
                <a href={link} rel="noreferrer" target={"_blank"}>
                    {link}
                </a>
                {testoACapo(secondaParte)}
            </div>
        );
    };

    const goToContattaciPage = () =>
        navigate(`/contattaci?immobileId=${house?.id}`);

    return (
        <div
            className={`page container-fluid text-center fullHeight ${styles.immobili}`}
        >
            <div className={`row fullHeight ${styles.row}`}>
                {width < 768 && (
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => goToContattaciPage()}
                    >
                        Ti interessa? Contattaci
                    </button>
                )}
                <div className={`${styles.houseWrapper} col-md-8`}>
                    <div className={styles.houseData}>
                        {house && (
                            <h3 className={`centered ${styles.title}`}>
                                <span className={styles.ref}>{house?.ref}</span>
                                {house?.titolo}
                            </h3>
                        )}
                        {house && (
                            <div className={styles.mainData}>
                                <div>
                                    <EuroIcon />
                                    {stringifyNumber(house.prezzo)}
                                    {house.contratto === "affitto"
                                        ? " al mese"
                                        : ""}
                                </div>
                                <div>
                                    <HomeIcon />{" "}
                                    {capitalize(
                                        house.tipologia ? house.tipologia : ""
                                    )}
                                </div>
                                <div>
                                    <SquareMetersIcon className={styles.icon} />{" "}
                                    {house.superficie} m²
                                </div>
                            </div>
                        )}

                        {
                            <HousePhoto
                                currentIndex={currentPhotoIndex}
                                onChangeIndex={setCurrentPhotoIndex}
                            />
                        }
                        {house && (
                            <FeaturesWrapper
                                title="Caratteristiche Principali"
                                features={caratteristiche.principali}
                            />
                        )}
                        {house &&
                            house.caratteristicheImmobile &&
                            house.caratteristicheImmobile.descrizione && (
                                <FeaturesWrapper title="Descrizione">
                                    <div className={styles.descrizione}>
                                        {elaborateDescrizione(
                                            house.caratteristicheImmobile
                                                .descrizione
                                        )}
                                    </div>
                                </FeaturesWrapper>
                            )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper
                                title="Efficienza Energetica e Riscaldamento"
                                features={caratteristiche.efficienzaEnergetica}
                            />
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper
                                title="Caratteristiche Edificio"
                                features={caratteristiche.costruzione}
                            />
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper
                                title="Caratteristiche Specifiche"
                                features={caratteristiche.specifiche}
                            />
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper
                                title="Caratteristiche Serramenti"
                                features={caratteristiche.serramenti}
                            />
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper
                                title="Caratteristiche Impianti"
                                features={caratteristiche.impianti}
                            />
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper
                                title="Categoria catastale e spese Previste"
                                features={caratteristiche.spese}
                            />
                        )}
                        {house &&
                            house.caratteristicheImmobile &&
                            house.contratto === "affitto" && (
                                <FeaturesWrapper
                                    title="Caratteristiche Locazione"
                                    features={caratteristiche.locazione}
                                ></FeaturesWrapper>
                            )}
                    </div>
                </div>
                <div className={`col-md-4 ${styles.wideScreenOnly}`}>
                    {isLoading && (
                        <div className={`${styles.spinnerWrapper} centered`}>
                            <Spinner type="blue" />
                        </div>
                    )}
                    {!isLoading && <ContactForm little />}
                </div>
            </div>
        </div>
    );
};

export default Immobile;
