import styles from "./HousePhoto.module.css";
import { ReactComponent as ArrowIcon } from "../../assets/icons/left-arrow.svg";
import notAvailable from "../../assets/notAvailable.png";
import { Dispatch, SetStateAction, useEffect } from "react";
import House from "../../types/House";
import Spinner from "../UI/Spinner/Spinner";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import axios from "axios";
import { addImage } from "../../store/houses-slice";
import { URL } from "../../env";

const HousePhoto: React.FC<{
    currentIndex: number;
    onChangeIndex: Dispatch<SetStateAction<number>>;
}> = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const id = Number.parseInt(
        location.pathname.split("?")[0].split("/").pop()!
    );

    const house: House | undefined = useSelector((state: RootState) =>
        state.houses.houses.find((el) => el.id === id)
    );

    useEffect(() => {
        const fetchImage = async () => {
            const fileId = house!.files[props.currentIndex].id;
            const image = await axios.get(
                URL + "immobili/" + house!.id + "/files/" + fileId
            );
            dispatch(
                addImage({
                    id: house!.id,
                    file: {
                        ...house!.files[props.currentIndex],
                        base64: "data:image/png;base64," + image.data.byteArray,
                    },
                })
            );
        };

        if (
            house &&
            house.files.length > 0 &&
            !house.files[props.currentIndex].base64
        ) {
            fetchImage();
        }
    }, [dispatch, house, props.currentIndex]);

    const isFirstIndex = () => props.currentIndex === 0;

    const isLastIndex = () =>
        house && props.currentIndex === house.files.length - 1;

    if (
        !house ||
        (house &&
            house.files.length > 0 &&
            !house.files[props.currentIndex].base64)
    ) {
        return (
            <div
                className={`${
                    window.innerWidth > 510 ? styles.wrapper : "centered"
                } ${styles.spinnerWrapper}`}
            >
                <Spinner type="blue" />
            </div>
        );
    }

    if (house && house.files.length === 0) {
        return (
            <div className={`${styles.imageWrapper} ${styles.wrapper}`}>
                <img src={notAvailable} alt="Immagine non disponibile" />
            </div>
        );
    }

    return (
        <div className={`${styles.imageWrapper} ${styles.wrapper}`}>
            <img
                src={house.files[props.currentIndex].base64}
                alt="Immagine non disponibile"
            />
            {isFirstIndex() && <div></div>}
            {!isFirstIndex() && (
                <div
                    className={`${styles.arrow} centered`}
                    onClick={() => {
                        props.onChangeIndex((prevIndex) => --prevIndex);
                    }}
                >
                    <ArrowIcon />
                </div>
            )}
            {isLastIndex() && <div></div>}
            {!isLastIndex() && (
                <div
                    className={`${styles.arrow} ${styles.right} centered`}
                    onClick={() => {
                        props.onChangeIndex((prevIndex) => ++prevIndex);
                    }}
                >
                    <ArrowIcon />
                </div>
            )}
            <div className={styles.numerazione}>
                {props.currentIndex + 1} di {house.files.length}
            </div>
        </div>
    );
};

export default HousePhoto;

/*
- sottoscrizione su immobile - vinta
- check if immagine esiste
- if immagine non esiste query e dispatch
- testing
*/
