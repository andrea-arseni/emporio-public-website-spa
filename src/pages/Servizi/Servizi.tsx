import Card from "../../components/UI/Card/Card";
import { services } from "../../static-data/services";
import { useNavigate } from "react-router-dom";

const Servizi: React.FC = () => {
    const navigate = useNavigate();

    const serviceCards = services.map((el) => (
        <div key={el.name} className={`col-3 centered`}>
            <Card
                message={el.title}
                onClick={() => navigate(el.name)}
                imageSrc={el.image}
            />
        </div>
    ));

    return (
        <div className={`page blue`}>
            <div className={`row`}>{serviceCards}</div>
        </div>
    );
};

export default Servizi;
