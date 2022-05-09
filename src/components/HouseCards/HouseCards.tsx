import { Fragment } from "react";
import House from "../../types/House";
import HouseCard from "./HouseCard/HouseCard";
import styles from "./HouseCards.module.css";

const HouseCards: React.FC<{
    listOfHouses: House[];
}> = (props) => {
    const houseCards = props.listOfHouses.map((el) => (
        <Fragment key={el.id}>
            <HouseCard house={el} />
        </Fragment>
    ));
    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.houseList}>{houseCards}</div>
        </div>
    );
};

export default HouseCards;
