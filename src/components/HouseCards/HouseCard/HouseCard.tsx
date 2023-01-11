import styles from "./HouseCard.module.css";
import notAvailable from "../../../assets/notAvailable.png";
import { stringifyNumber } from "../../../utils/numberHandler";
import { ReactComponent as EuroIcon } from "../../../assets/icons/euro.svg";
import { ReactComponent as SquareMetersIcon } from "../../../assets/icons/planimetry.svg";
import { ReactComponent as TownIcon } from "../../../assets/icons/building.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios";
import { URL } from "../../../env";
import House from "../../../types/House";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../../../store/houses-slice";
import { RootState } from "../../../store";
import { capitalize, correctZona } from "../../../utils/stringHandler";
import File from "../../../types/File";
import useWindowSize from "../../../hooks/use-size";

const HouseCard: React.FC<{
    house: House;
}> = (props) => {
    const houseFile = useSelector((state: RootState) => {
        const house = state.houses.houses.find(
            (el) => el.id === props.house.id
        );
        return house && house.files[0] && house.files[0].base64
            ? house.files[0].base64
            : null;
    });

    const [width] = useWindowSize();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const navigateToDedicatedHousePage = () =>
        navigate("/immobili/" + props.house.id);

    const [isLoading, setIsLoading] = useState(!!!houseFile);

    const [imageString, setImageString] = useState(
        houseFile ? houseFile : notAvailable
    );

    useEffect(() => {
        const fetchImage = async (firstPhoto: File) => {
            try {
                const res = await axios.get(
                    `${URL}immobili/${props.house.id}/files/${firstPhoto.id}`
                );
                const immagine = "data:image/png;base64," + res.data.byteArray;
                setImageString(immagine);
                dispatch(
                    addImage({
                        id: firstPhoto.id,
                        file: { ...firstPhoto, base64: immagine },
                    })
                );
                setIsLoading(false);
            } catch (e: any) {
                setIsLoading(false);
            }
        };

        const photos = props.house.files.filter(
            (el) => el.tipologia === "FOTO"
        );

        let firstPhoto = null;

        if (photos) {
            photos.sort((el1, el2) => +el1.nome - +el2.nome);
            firstPhoto = photos[0];
        }

        if (!firstPhoto || houseFile) {
            setIsLoading(false);
        } else {
            fetchImage(firstPhoto);
        }
    }, [props.house.id, props.house.files, dispatch, houseFile]);

    const addLocali = () => {
        const tipologia = props.house.tipologia?.toLowerCase();
        return !tipologia ||
            tipologia === "box" ||
            tipologia === "camera singola" ||
            tipologia === "loft" ||
            tipologia === "posto auto" ||
            tipologia === "posto letto in camera condivisa" ||
            tipologia === "uffici open space"
            ? ""
            : `di ${props.house.locali} local${
                  props.house.locali === 1 ? "e" : "i"
              }`;
    };

    return (
        <div
            onClick={navigateToDedicatedHousePage}
            className={`${styles.houseCard}`}
        >
            {width <= 550 && (
                <p className={styles.titolo}>
                    <span className={styles.ref}>{props.house.ref}</span>
                    {props.house.titolo}
                </p>
            )}
            <div className={`${styles.wrapper}`}>
                <div className={`centered ${styles.imgWrapper}`}>
                    {isLoading && (
                        <div
                            className={`fullHeight centered ${styles.spinnerWrapper}`}
                        >
                            <Spinner type="blue" />
                        </div>
                    )}
                    {!isLoading && (
                        <img alt="Foto non disponibile" src={imageString} />
                    )}
                </div>
                {
                    <div className={styles.textPart}>
                        {width > 550 && (
                            <p className={styles.titolo}>
                                <span className={styles.ref}>
                                    {props.house.ref}
                                </span>
                                {props.house.titolo}
                            </p>
                        )}
                        <span>
                            <EuroIcon className={styles.euroicon} />{" "}
                            {`${stringifyNumber(props.house.prezzo)} 
                    ${props.house.contratto === "affitto" ? " al mese" : ""}`}
                        </span>
                        <span>
                            <i className="bi bi-house-door rightSpace"></i>
                            {`${
                                props.house.tipologia
                                    ? capitalize(props.house.tipologia)
                                    : ""
                            } ${addLocali()}`}
                        </span>
                        <span>
                            <SquareMetersIcon className={styles.icon} />{" "}
                            {`${props.house.superficie} m²
                    ${width > 500 ? "di superficie" : ""}`}
                        </span>
                        <span>
                            <TownIcon className={styles.icon} />
                            {props.house.comune}{" "}
                            {props.house.zona && width > 500
                                ? `(${correctZona(props.house.zona)})`
                                : ""}
                        </span>
                    </div>
                }
            </div>
        </div>
    );
};

export default HouseCard;
