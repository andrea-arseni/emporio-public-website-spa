import styles from "./Tv.module.css";
import { tvMessages } from "../../static-data/tv-messages";
import { hideBanner } from "../../store/cookie-slice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TvStaticMessage from "../../components/TvStaticMessage/TvStaticMessage";
import TvDinamicMessage from "../../components/TvDinamicMessage/TvDinamicMessage";
import House from "../../types/House";
import { URL } from "../../env";
import axios from "axios";

const Tv: React.FC<{}> = () => {
    const dispatch = useDispatch();
    dispatch(hideBanner());

    let [listOfItems, setListOfItems] = useState<any[]>(tvMessages);

    const updateList = (immobili: House[]) => {
        const list: any[] = [];
        let tvMessagesIndex = 0;
        immobili.forEach((el, index) => {
            list.push(el);
            if ((index + 1) % 2 === 0) {
                list.push(tvMessages[tvMessagesIndex]);
                tvMessagesIndex === tvMessages.length - 1
                    ? (tvMessagesIndex = 0)
                    : ++tvMessagesIndex;
            }
        });
        return list;
    };

    useEffect(() => {
        const fetchImmobili = async () => {
            try {
                const res = await axios.get(
                    URL +
                        "immobili?contratto=Tutti&categoria=Tutti&results=100&sort=prezzo-desc"
                );
                let immobili: House[] = res.data.data;
                immobili = immobili.filter((el) => el.files.length > 0);
                for (let immobile of immobili) {
                    const res = await axios.get(
                        `${URL}immobili/${immobile.id}/files/${immobile.files[0].id}`
                    );
                    immobile.files[0].base64 =
                        "data:image/png;base64," + res.data.byteArray;
                }
                const immobiliResidenziali = immobili.filter(
                    (el) => el.categoria === "residenziale"
                );
                const immobiliCommerciali = immobili.filter(
                    (el) => el.categoria === "commerciale"
                );
                const updatedList = updateList([
                    ...immobiliResidenziali,
                    ...immobiliCommerciali,
                ]);
                setListOfItems((prevList) => [...prevList, ...updatedList]);
            } catch (e: any) {}
        };

        fetchImmobili();
    }, []);

    let [currentIndex, setCurrentIndex] = useState(0);

    const isPreviousItem = (index: number) =>
        index === currentIndex - 1 ||
        (currentIndex === 0 && index === listOfItems.length - 1);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === listOfItems.length - 1 ? 0 : ++prevIndex
            );
        }, 5000);
        return () => clearTimeout(timeout);
    }, [currentIndex, listOfItems.length]);

    return (
        <div className={`${styles.container}`}>
            {listOfItems.map((el, index) => {
                return el.id ? (
                    <TvDinamicMessage
                        key={el.id}
                        house={el}
                        currentIndex={currentIndex}
                        isPreviousItem={isPreviousItem}
                        itemIndex={index}
                    />
                ) : (
                    <TvStaticMessage
                        key={el.title + index}
                        item={el}
                        currentIndex={currentIndex}
                        isPreviousItem={isPreviousItem}
                        itemIndex={index}
                    />
                );
            })}
        </div>
    );
};

export default Tv;
