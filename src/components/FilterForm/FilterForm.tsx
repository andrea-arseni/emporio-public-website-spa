import React, { useCallback, useRef, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { stringifyNumber } from "../../utils/numberHandler";
import Button from "../UI/Button/Button";
import styles from "./FilterForm.module.css";
import Select from "../UI/Select/Select";

const generatePriceList = () => {
    const priceList: { value: number; name: string }[] = [];
    for (let i = 10000; i < 1000000; i += 10000) {
        priceList.push({ value: i, name: stringifyNumber(i) + " €" });
    }
    priceList.unshift({ value: 0, name: "Indifferente" });
    priceList.push({ value: 10000000, name: "Un milione di € e oltre" });
    return priceList;
};

const retrieveInitialIndex = (
    searchParamName: string,
    searchParams: URLSearchParams,
    priceList: { value: number; name: string }[],
    defaultValue: number
) =>
    searchParams.get(searchParamName)
        ? priceList.findIndex(
              (el) => el.value.toString() === searchParams.get(searchParamName)
          )
        : defaultValue;

const FilterForm: React.FC<{
    setSearchParams: (obj: any) => void;
    searchParams: URLSearchParams;
    setFilterFormOpened?: any;
}> = (props) => {
    const priceList: { value: number; name: string }[] = generatePriceList();

    const [minPriceIndex, setMinPriceIndex] = useState(
        retrieveInitialIndex("priceMin", props.searchParams, priceList, 0)
    );

    const [maxPriceIndex, setMaxPriceIndex] = useState(
        retrieveInitialIndex(
            "priceMax",
            props.searchParams,
            priceList,
            priceList.length - 1
        )
    );

    const [isFormUsed, setIsFormUsed] = useState(false);

    const minPriceHandler = (event: any) => {
        selectFormHandler();
        const newMinValue = event.target.value;
        const newMinValueIndex = priceList.findIndex(
            (el) => el.value == newMinValue
        );
        setMinPriceIndex(newMinValueIndex);
    };

    const maxPriceHandler = (event: any) => {
        selectFormHandler();
        const newMaxValue = event.target.value;
        const newMaxValueIndex = priceList.findIndex(
            (el) => el.value == newMaxValue
        );
        setMaxPriceIndex(newMaxValueIndex);
    };
    const selectFormHandler = () => setIsFormUsed(true);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }
        await executeRecaptcha();
    }, [executeRecaptcha]);

    const inputContrattoRef = useRef<HTMLSelectElement>(null);
    const inputCategoriaRef = useRef<HTMLSelectElement>(null);
    const inputPriceMinRef = useRef<HTMLSelectElement>(null);
    const inputPriceMaxRef = useRef<HTMLSelectElement>(null);

    // setNewQueryParams
    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        handleReCaptchaVerify();
        setIsFormUsed(false);
        if (props.setFilterFormOpened) props.setFilterFormOpened(false);
        props.setSearchParams({
            contratto: inputContrattoRef.current!.value,
            categoria: inputCategoriaRef.current!.value,
            priceMin: inputPriceMinRef.current!.value,
            priceMax: inputPriceMaxRef.current!.value,
        });
    };

    return (
        <div className={`centered ${styles.formWrapper}`}>
            <form className={`${styles.form} centered`}>
                <Select
                    onChange={selectFormHandler}
                    labelName="Contratto"
                    options={[
                        { name: "Tutti", value: "Tutti" },
                        { name: "Vendita", value: "Vendita" },
                        { name: "Affitto", value: "Affitto" },
                    ]}
                    defaulValue={props.searchParams.get("contratto")}
                    ref={inputContrattoRef}
                />
                <Select
                    onChange={selectFormHandler}
                    labelName="Categoria"
                    options={[
                        { name: "Tutti", value: "Tutti" },
                        { name: "Residenziale", value: "Residenziale" },
                        { name: "Commerciale", value: "Commerciale" },
                    ]}
                    defaulValue={props.searchParams.get("categoria")!}
                    ref={inputCategoriaRef}
                />
                <Select
                    onChange={minPriceHandler}
                    labelName="Prezzo Minimo"
                    options={priceList.filter(
                        (el, index) => index < maxPriceIndex
                    )}
                    defaulValue={priceList[minPriceIndex].value}
                    ref={inputPriceMinRef}
                />
                <Select
                    onChange={maxPriceHandler}
                    labelName="Prezzo Massimo"
                    options={priceList.filter(
                        (el, index) => index > minPriceIndex
                    )}
                    defaulValue={priceList[maxPriceIndex].value}
                    ref={inputPriceMaxRef}
                />
                <Button
                    color="blue"
                    disabled={!isFormUsed}
                    onClick={submitForm}
                >
                    Filtra Immobili
                </Button>
            </form>
        </div>
    );
};

export default FilterForm;
