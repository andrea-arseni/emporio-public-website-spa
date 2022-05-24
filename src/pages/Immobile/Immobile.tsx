import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../env";
import {
    addFiles,
    addCaratteristiche,
    addHouses,
} from "../../store/houses-slice";
import { stringifyNumber } from "../../utils/numberHandler";
import Button from "../../components/UI/Button/Button";
import styles from "./Immobile.module.css";
import { RootState } from "../../store";
import axios from "axios";
import ContactForm from "../../components/ContactForm/ContactForm";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import FeaturesWrapper from "../../components/FeaturesWrapper/FeaturesWrapper";
import { ReactComponent as EuroIcon } from "../../assets/icons/euro.svg";
import { ReactComponent as SquareMetersIcon } from "../../assets/icons/planimetry.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import HousePhoto from "../../components/HousePhoto/HousePhoto";
import ErrorPage from "../Error/Error";

type FeatureField = {
    value: string;
    label: string;
};

const Immobile: React.FC<{}> = () => {
    const location = useLocation();
    const dispatch = useDispatch();

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

    const [filterFormOpened, setFilterFormOpened] = useState(false);

    const filterFormToggler = () =>
        setFilterFormOpened((prevState) => !prevState);

    if (errorMessage) return <ErrorPage message={errorMessage} />;

    const isSpecified = (valore: string) =>
        valore &&
        valore.toLowerCase() !== "undefined" &&
        valore.toLowerCase() !== "null";

    const displayNonSpecificatoSeAssente = (valore: any) =>
        isSpecified(valore) ? valore : "Non specificato";

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
                value: `${
                    house.contratto.charAt(0).toUpperCase() +
                    house.contratto.substring(1)
                } di immobile ${house.categoria}`,
                label: "Categoria",
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
                value: `${house.indirizzo}`,
                label: "Indirizzo",
            });
        }
        if (isSpecified(house.comune)) {
            caratteristiche.principali.push({
                value: `${house.comune} ${house.zona ? `(${house.zona})` : ""}`,
                label: "Comune",
            });
        }
    }

    if (house && house.caratteristicheImmobile) {
        caratteristiche.efficienzaEnergetica = [
            {
                value: `${
                    house.classeEnergetica === "ESENTE"
                        ? "Esente"
                        : house.classeEnergetica.trim()
                }${
                    house.classeEnergetica !== "ESENTE"
                        ? ` ${
                              house.consumo !== 175
                                  ? house.consumo
                                  : `> ${house.consumo}`
                          } kWh/m² anno`
                        : ""
                }`,
                label: "Classe energetica",
            },
            {
                value: `${house.riscaldamento} ${
                    house.caratteristicheImmobile.combustibile
                        ? `(Combustibile ${house.caratteristicheImmobile.combustibile.toLowerCase()})`
                        : ""
                }`,
                label: "Riscaldamento",
            },
        ];
        if (
            house.riscaldamento &&
            house.riscaldamento.trim().toLowerCase() === "autonomo"
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

        if (house.caratteristicheImmobile.annoCostruzione) {
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
            caratteristiche.specifiche.push({
                value: `${house.piano} (${
                    house.caratteristicheImmobile.ascensore ? `Con` : "Senza"
                } ascensore)`,
                label: "Piano",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.esposizione)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.esposizione,
                label: "Esposizione",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.balconi)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.balconi,
                label: "Balconi",
            });
        }

        if (isSpecified(house.caratteristicheImmobile.terrazzi)) {
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.terrazzi,
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
            caratteristiche.specifiche.push({
                value: house.caratteristicheImmobile.altezza + " metri",
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
                    house.caratteristicheImmobile.speseExtra
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
                    house.caratteristicheImmobile.tipoLocazione
                ),
                label: "Tipo locazione",
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

    return (
        <div className={`page gray`}>
            <div className={styles.filterButtonArea}>
                <Button
                    onClick={filterFormToggler}
                    color="blue_outline"
                    fillSpace
                >
                    {filterFormOpened ? "Chiudi Form" : "Ti interessa?"}
                </Button>
            </div>
            {filterFormOpened && (
                <div className={`centered`}>
                    <ContactForm />
                </div>
            )}
            <div>
                <div className={`col-8 ${styles.houseWrapper}`}>
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
                                    <EuroIcon className={styles.icon} />{" "}
                                    {stringifyNumber(house.prezzo)}
                                    {house.contratto === "affitto"
                                        ? " al mese"
                                        : ""}
                                </div>
                                <div>
                                    <HomeIcon className={styles.icon} />{" "}
                                    {house.locali} locali
                                </div>
                                <div>
                                    <SquareMetersIcon className={styles.icon} />{" "}
                                    {house.superficie} m²
                                </div>
                            </div>
                        )}

                        <HousePhoto
                            currentIndex={currentPhotoIndex}
                            onChangeIndex={setCurrentPhotoIndex}
                        />
                        {house && (
                            <FeaturesWrapper title="Caratteristiche Principali">
                                {caratteristiche.principali.map((el) => (
                                    <Input
                                        key={el.label}
                                        type="text"
                                        value={el.value}
                                        ref={null}
                                        readOnly
                                    >
                                        {el.label}
                                    </Input>
                                ))}
                            </FeaturesWrapper>
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
                            <FeaturesWrapper title="Efficienza Energetica e Riscaldamento">
                                {caratteristiche.efficienzaEnergetica.map(
                                    (el) => (
                                        <Input
                                            key={el.label}
                                            type="text"
                                            value={el.value}
                                            ref={null}
                                            readOnly
                                        >
                                            {el.label}
                                        </Input>
                                    )
                                )}
                            </FeaturesWrapper>
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper title="Caratteristiche Costruzione">
                                {caratteristiche.costruzione.map((el) => (
                                    <Input
                                        key={el.label}
                                        type="text"
                                        value={el.value}
                                        ref={null}
                                        readOnly
                                    >
                                        {el.label}
                                    </Input>
                                ))}
                            </FeaturesWrapper>
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper title="Caratteristiche Specifiche">
                                {caratteristiche.specifiche.map((el) => (
                                    <Input
                                        key={el.label}
                                        type="text"
                                        value={el.value}
                                        ref={null}
                                        readOnly
                                    >
                                        {el.label}
                                    </Input>
                                ))}
                            </FeaturesWrapper>
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper title="Caratteristiche Serramenti">
                                {caratteristiche.serramenti.map((el) => (
                                    <Input
                                        key={el.label}
                                        type="text"
                                        value={el.value}
                                        ref={null}
                                        readOnly
                                    >
                                        {el.label}
                                    </Input>
                                ))}
                            </FeaturesWrapper>
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper title="Caratteristiche Impianti">
                                {caratteristiche.impianti.map((el) => (
                                    <Input
                                        key={el.label}
                                        type="text"
                                        value={el.value}
                                        ref={null}
                                        readOnly
                                    >
                                        {el.label}
                                    </Input>
                                ))}
                            </FeaturesWrapper>
                        )}
                        {house && house.caratteristicheImmobile && (
                            <FeaturesWrapper title="Categoria catastale e spese Previste">
                                {caratteristiche.spese.map((el) => (
                                    <Input
                                        key={el.label}
                                        type="text"
                                        value={el.value}
                                        ref={null}
                                        readOnly
                                    >
                                        {el.label}
                                    </Input>
                                ))}
                            </FeaturesWrapper>
                        )}
                        {house &&
                            house.caratteristicheImmobile &&
                            house.contratto === "affitto" && (
                                <FeaturesWrapper title="Caratteristiche Locazione"></FeaturesWrapper>
                            )}
                    </div>
                </div>
            </div>
            <div className={`col-4 centered ${styles.wideScreenOnly}`}>
                {isLoading && (
                    <div className={`${styles.spinnerWrapper} centered`}>
                        <Spinner type="blue" />
                    </div>
                )}
                {!isLoading && <ContactForm />}
            </div>
        </div>
    );
};

export default Immobile;
