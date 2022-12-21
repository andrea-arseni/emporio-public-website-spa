import { useSearchParams } from "react-router-dom";
import FilterForm from "../../components/FilterForm/FilterForm";
import styles from "./Filtra.module.css";

const Filtra: React.FC<{}> = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div
            className={`page container-fluid text-center fullHeight ${styles.gradient}`}
        >
            <div className="row fullHeight">
                <div className="col-xs-10 col-sm-8 col-md-6 offset-xs-1 offset-sm-2 offset-md-3 centered fullHeight">
                    <FilterForm
                        fat
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filtra;
