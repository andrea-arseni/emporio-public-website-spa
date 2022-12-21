import Card from "../../components/UI/Card/Card";
import { services } from "../../static-data/services";
import { useNavigate } from "react-router-dom";
import styles from "./Servizi.module.css";

const Servizi: React.FC = () => {
    const navigate = useNavigate();

    const serviceCards = services.map((el) => (
        <div
            className={`col-xs-12 col-sm-6 col-md-4 col-lg-3 centered ${styles.col}`}
            key={el.name}
        >
            <Card
                message={el.title}
                onClick={() => navigate(el.name)}
                imageSrc={el.image}
            />
        </div>
    ));

    return (
        <div className={`page container-fluid fullHeight ${styles.container}`}>
            <div className={`row fullHeight  centered ${styles.row}`}>
                {serviceCards}
            </div>
        </div>
    );
};

export default Servizi;
