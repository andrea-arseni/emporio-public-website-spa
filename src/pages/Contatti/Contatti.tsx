import Table from "../../components/Table/Table";
import Map from "../../components/Map/Map";
import styles from "./Contatti.module.css";

const Contatti: React.FC = () => {
    return (
        <div className={`${styles.contatti} page row blue`}>
            <div className="col-md-2">
                <Map />
            </div>
            <div className="col-md-2">
                <Table />
            </div>
        </div>
    );
};

export default Contatti;
