import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import FilterForm from "../../components/FilterForm/FilterForm";
import HouseCards from "../../components/HouseCards/HouseCards";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { addHouses } from "../../store/houses-slice";
import { URL } from "../../env";
import styles from "./Immobili.module.css";
import House from "../../types/House";
import ErrorPage from "../Error/Error";
import NoHouses from "../../components/NoHouses/NoHouses";

const buildQueryParam = (
    searchParams: URLSearchParams,
    object: string,
    queryParams: string
) => {
    return searchParams.get(object) ||
        object === "contratto" ||
        object === "categoria"
        ? `${queryParams === "" ? "?" : queryParams + "&"}${object}=${
              searchParams.get(object) ? searchParams.get(object) : "Tutti"
          }`
        : queryParams;
};

const buildQueryParams = (searchParams: URLSearchParams) => {
    let keys = ["contratto", "categoria", "priceMin", "priceMax", "page"];
    let queryParams = "";
    keys.forEach(
        (el) => (queryParams = buildQueryParam(searchParams, el, queryParams))
    );
    return queryParams;
};

const Immobili: React.FC = () => {
    const dispatch = useDispatch();

    const [houses, setHouses] = useState<House[]>([]);

    const [filterFormOpened, setFilterFormOpened] = useState(false);

    const filterFormToggler = () =>
        setFilterFormOpened((prevState) => !prevState);

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [numberOfResults, setNumberOfResults] = useState(0);

    useEffect(() => {
        const fetchImmobili = async () => {
            const queryParams = buildQueryParams(searchParams);
            try {
                setIsLoading(true);
                const res = await axios.get(
                    URL + "immobili" + queryParams + "&sort=prezzo-desc"
                );
                setNumberOfResults(res.data.numberOfResults);
                dispatch(addHouses(res.data.data));
                setHouses(res.data.data);
                setIsLoading(false);
            } catch (e: any) {
                setIsLoading(false);
                if (e.response) {
                    setErrorMessage(e.response.data.message);
                } else {
                    setErrorMessage("Errore sconosciuto, operazione fallita");
                }
            }
        };

        fetchImmobili();
    }, [searchParams, dispatch]);

    if (errorMessage) return <ErrorPage message={errorMessage} />;

    const houseContent = () => {
        if (isLoading) return <Spinner type="white" />;
        if (houses.length === 0) return <NoHouses />;
        return (
            <Fragment>
                <HouseCards listOfHouses={houses} />
                <PaginationBar
                    numberOfResults={numberOfResults}
                    currentPage={
                        searchParams.get("page")
                            ? searchParams.get("page")!
                            : "1"
                    }
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            </Fragment>
        );
    };

    return (
        <div className={`page blue ${styles.immobili}`}>
            <div className={styles.filterButtonArea}>
                <Button
                    onClick={filterFormToggler}
                    color="blue_outline"
                    fillSpace
                >
                    {filterFormOpened ? "Chiudi Form" : "Filtra Immobili"}
                </Button>
            </div>
            {filterFormOpened && (
                <div className={`${styles.filterFormWrapper} centered`}>
                    <FilterForm
                        setFilterFormOpened={setFilterFormOpened}
                        setSearchParams={setSearchParams}
                        searchParams={searchParams}
                    />
                </div>
            )}
            <div className={`col-8 centered ${styles.housePart}`}>
                {houseContent()}
            </div>
            <div
                className={`col-4 ${styles.filterForm} ${styles.wideScreenOnly}`}
            >
                <FilterForm
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                />
            </div>
        </div>
    );
};

export default Immobili;
