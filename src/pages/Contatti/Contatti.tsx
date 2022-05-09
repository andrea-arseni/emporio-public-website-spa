import Table from "../../components/Table/Table";
import Map from "../../components/Map/Map";
import styles from "./Contatti.module.css";

const Contatti: React.FC = () => {
    return (
        <div className={`${styles.contatti} page row blue`}>
            <div className="col-6">
                <Map />
            </div>
            <div className="col-6">
                <Table />
            </div>
        </div>
    );
};

export default Contatti;
