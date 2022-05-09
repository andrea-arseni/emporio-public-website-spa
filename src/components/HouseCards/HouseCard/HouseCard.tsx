import styles from "./HouseCard.module.css";
import notAvailable from "../../../assets/notAvailable.png";
import { stringifyNumber } from "../../../utils/numberHandler";
import { ReactComponent as EuroIcon } from "../../../assets/icons/euro.svg";
import { ReactComponent as SquareMetersIcon } from "../../../assets/icons/planimetry.svg";
import { ReactComponent as HomeIcon } from "../../../assets/icons/home.svg";
import { ReactComponent as TownIcon } from "../../../assets/icons/building.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios";
import { URL } from "../../../env";
import House from "../../../types/House";

const HouseCard: React.FC<{
    house: House;
}> = (props) => {
    const navigate = useNavigate();

    const navigateToDedicatedHousePage = () =>
        navigate("/immobili/" + props.house.id);

    const [isLoading, setIsLoading] = useState(true);

    const [imageString, setImageString] = useState(notAvailable);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(
                    `${URL}immobili/${props.house.id}/files/${props.house.files[0].id}`
                );
                setImageString("data:image/png;base64," + res.data.byteArray);
                setIsLoading(false);
            } catch (e: any) {
                setIsLoading(false);
                if (e.response) {
                    console.log(e.response.data.message);
                } else {
                    console.log(e);
                }
            }
        };

        if (props.house.files.length === 0) {
            setIsLoading(false);
        } else {
            fetchImage();
        }
    }, [props.house.id, props.house.files]);

    return (
        <div
            onClick={navigateToDedicatedHousePage}
            className={`centered ${styles.houseCard}`}
        >
            <div className={`centered ${styles.imgWrapper}`}>
                {isLoading && <Spinner type="blue" />}
                {!isLoading && (
                    <img alt="Foto non disponibile" src={imageString} />
                )}
            </div>
            <div className={styles.textPart}>
                <span className={styles.titolo}>{props.house.titolo}</span>
                <span>
                    <EuroIcon className={styles.icon} />{" "}
                    {stringifyNumber(props.house.prezzo)}
                    {props.house.contratto === "affitto" ? " al mese" : ""}
                </span>
                <span>
                    <HomeIcon className={styles.icon} /> {props.house.locali}{" "}
                    locali
                </span>
                <span>
                    {" "}
                    <SquareMetersIcon className={styles.icon} />{" "}
                    {props.house.superficie} m
                    <sup className={styles.sup}>2</sup>{" "}
                    {window.innerWidth > 500 && "di superficie"}
                </span>
                <span>
                    <TownIcon className={styles.icon} />
                    {props.house.comune}{" "}
                    {props.house.zona && window.innerWidth > 500
                        ? `(${props.house.zona})`
                        : ""}
                </span>
            </div>
        </div>
    );
};

export default HouseCard;
