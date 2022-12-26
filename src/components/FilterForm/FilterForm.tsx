import React, { FormEvent, useEffect, useRef, useState } from "react";
import { stringifyNumber } from "../../utils/numberHandler";
import Button from "../UI/Button/Button";
import styles from "./FilterForm.module.css";
import Select from "../UI/Select/Select";
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const generatePriceList = (isContrattoAffitto: boolean) => {
    const priceList: { value: number; name: string }[] = [];
    for (let i = 100; i < 10000; i += 100) {
        const number = isContrattoAffitto ? i : i * 100;
        priceList.push({
            value: number,
            name: stringifyNumber(number) + " €",
        });
    }
    priceList.unshift({ value: 0, name: "Indifferente" });
    priceList.push({
        value: 10000000,
        name: isContrattoAffitto
            ? "10.000 € e oltre"
            : "Un milione di € e oltre",
    });
    return priceList;
};

const PRICES_VENDITA = generatePriceList(false);

const PRICES_AFFITTO = generatePriceList(true);

const FilterForm: React.FC<{
    setSearchParams: (obj: any) => void;
    searchParams: URLSearchParams;
    fat?: boolean;
}> = (props) => {
    const navigate = useNavigate();

    const [priceList, setPriceList] = useState<
        { value: number; name: string }[]
    >([]);

    const [minPriceIndex, setMinPriceIndex] = useState(0);

    const [maxPriceIndex, setMaxPriceIndex] = useState(100);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const isContrattoAffitto =
            props.searchParams.get("contratto")?.trim().toLowerCase() ===
            "affitto";

        setPriceList(isContrattoAffitto ? PRICES_AFFITTO : PRICES_VENDITA);

        const PRICES = isContrattoAffitto ? PRICES_AFFITTO : PRICES_VENDITA;

        const retrieveInitialIndex = (
            searchParamName: string,
            defaultValue: number
        ) => {
            if (
                !props.searchParams.get(searchParamName) ||
                PRICES.length === 0
            ) {
                return defaultValue;
            }
            const index = PRICES.findIndex(
                (el) =>
                    el.value.toString() ===
                    props.searchParams.get(searchParamName)
            );
            if (index === -1 && !errorMessage) {
                setErrorMessage(
                    `Parametro di ricerca ${
                        searchParamName === "priceMin"
                            ? `"priceMin"`
                            : `"priceMax"`
                    } non corretto. Usare il form per evitare errori.`
                );
                return defaultValue;
            }
            return index;
        };

        setMinPriceIndex(retrieveInitialIndex("priceMin", 0));

        setMaxPriceIndex(retrieveInitialIndex("priceMax", 100));
    }, [props.searchParams, errorMessage]);

    const [contratto, setContratto] = useState<string | null>(
        props.searchParams.get("contratto")
            ? props.searchParams.get("contratto")
            : "Tutti"
    );

    const [categoria, setCategoria] = useState<string | null>(
        props.searchParams.get("categoria")
            ? props.searchParams.get("categoria")
            : "Tutti"
    );

    useEffect(() => {
        const isContrattoAffitto =
            contratto?.trim().toLowerCase() === "affitto";

        setPriceList(isContrattoAffitto ? PRICES_AFFITTO : PRICES_VENDITA);
    }, [contratto]);

    const formControlHandler = (
        event: any,
        type: "contratto" | "categoria"
    ) => {
        selectFormHandler();
        type === "contratto"
            ? setContratto(event.target.value)
            : setCategoria(event.target.value);
    };

    const [isFormUsed, setIsFormUsed] = useState(false);

    const minPriceHandler = (event: any) => {
        selectFormHandler();
        const newMinValue = event.target.value;
        const newMinValueIndex = priceList.findIndex(
            (el) => el.value.toString() === newMinValue
        );
        setMinPriceIndex(newMinValueIndex);
    };

    const maxPriceHandler = (event: any) => {
        selectFormHandler();
        const newMaxValue = event.target.value;
        const newMaxValueIndex = priceList.findIndex(
            (el) => el.value.toString() === newMaxValue
        );
        setMaxPriceIndex(newMaxValueIndex);
    };
    const selectFormHandler = () => setIsFormUsed(true);

    const inputContrattoRef = useRef<HTMLSelectElement>(null);
    const inputCategoriaRef = useRef<HTMLSelectElement>(null);
    const inputPriceMinRef = useRef<HTMLSelectElement>(null);
    const inputPriceMaxRef = useRef<HTMLSelectElement>(null);

    // setNewQueryParams
    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsFormUsed(false);
        props.setSearchParams({
            contratto: inputContrattoRef.current!.value,
            categoria: inputCategoriaRef.current!.value,
            priceMin: inputPriceMinRef.current!.value,
            priceMax: inputPriceMaxRef.current!.value,
        });
        navigate(
            `/immobili?contratto=${
                inputContrattoRef.current!.value
            }&categoria=${inputCategoriaRef.current!.value}&priceMin=${
                inputPriceMinRef.current!.value
            }&priceMax=${inputPriceMaxRef.current!.value}`
        );
    };

    return (
        <div
            className={`centered ${styles.formWrapper} ${
                props.fat ? styles.fat : styles.slim
            }`}
        >
            {!errorMessage && (
                <form className={`${styles.form} centered`}>
                    <h4 style={{ fontWeight: "lighter" }}>
                        Filtra gli Immobili
                    </h4>
                    <Select
                        onChange={(e) => formControlHandler(e, "contratto")}
                        labelName="Contratto"
                        options={[
                            { name: "Tutti", value: "Tutti" },
                            { name: "Vendita", value: "Vendita" },
                            { name: "Affitto", value: "Affitto" },
                        ]}
                        value={contratto}
                        ref={inputContrattoRef}
                    />
                    <Select
                        onChange={(e) => formControlHandler(e, "categoria")}
                        labelName="Categoria"
                        options={[
                            { name: "Tutti", value: "Tutti" },
                            { name: "Residenziale", value: "Residenziale" },
                            { name: "Commerciale", value: "Commerciale" },
                        ]}
                        value={categoria}
                        ref={inputCategoriaRef}
                    />
                    {priceList.length > 0 && (
                        <Select
                            onChange={minPriceHandler}
                            labelName="Prezzo Minimo"
                            options={priceList.filter(
                                (_, index) => index < maxPriceIndex
                            )}
                            value={priceList[minPriceIndex].value}
                            ref={inputPriceMinRef}
                        />
                    )}
                    {priceList.length > 0 && (
                        <Select
                            onChange={maxPriceHandler}
                            labelName="Prezzo Massimo"
                            options={priceList.filter(
                                (_, index) => index > minPriceIndex
                            )}
                            ref={inputPriceMaxRef}
                            value={priceList[maxPriceIndex].value}
                        />
                    )}
                    <br />
                    <Button
                        color="blue"
                        disabled={!isFormUsed}
                        onClick={submitForm}
                    >
                        Applica Filtro
                    </Button>
                    {props.fat && <span style={{ height: "6px" }} />}
                    {props.fat && (
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
            {errorMessage &&
                ReactDOM.createPortal(
                    <Modal
                        header="Attenzione!"
                        text={[errorMessage]}
                        buttons={[
                            {
                                message: "Chiudi",
                                color: "red",
                                action: () => {
                                    setErrorMessage("");
                                    props.setSearchParams({
                                        contratto: "Tutti",
                                        categoria: "Tutti",
                                        priceMin: 0,
                                        priceMax: 10000000,
                                    });
                                },
                            },
                        ]}
                    />,
                    document.querySelector("body")!
                )}
        </div>
    );
};

export default FilterForm;
