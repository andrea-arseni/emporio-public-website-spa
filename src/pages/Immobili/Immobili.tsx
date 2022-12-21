import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import FilterForm from "../../components/FilterForm/FilterForm";
import HouseCards from "../../components/HouseCards/HouseCards";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { addHouses } from "../../store/houses-slice";
import { URL } from "../../env";
import styles from "./Immobili.module.css";
import House from "../../types/House";
import NoHouses from "../../components/NoHouses/NoHouses";
import ReactDOM from "react-dom";
import Modal from "../../components/Modal/Modal";
import useWindowSize from "../../hooks/use-size";

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

    const [width] = useWindowSize();

    const location = useLocation();

    const navigate = useNavigate();

    const [houses, setHouses] = useState<House[]>([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [numberOfResults, setNumberOfResults] = useState(0);

    useEffect(() => {
        const fetchImmobili = async () => {
            const queryParams = buildQueryParams(searchParams);
            try {
                setIsLoading(true);
                const url =
                    URL + "immobili" + queryParams + "&sort=prezzo-desc";
                const res = await axios.get(url);
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

    const goToFilterPage = () => navigate("/filtra" + location.search);

    const houseContent = () => {
        if (isLoading) return <Spinner type="blue" />;
        if (houses.length === 0) return <NoHouses />;
        return <HouseCards listOfHouses={houses} />;
    };

    return (
        <div
            className={`page container-fluid text-center fullHeight ${styles.immobili}`}
        >
            <div className={`row ${styles.row}`}>
                {width < 768 && (
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => goToFilterPage()}
                    >
                        Filtra gli Immobili
                    </button>
                )}
                <div
                    className={`centered ${styles.housePart} col-md-8 fullHeight`}
                >
                    {houseContent()}
                </div>
                {width >= 768 && (
                    <div className={` col-md-4 centered`}>
                        <FilterForm
                            setSearchParams={setSearchParams}
                            searchParams={searchParams}
                        />
                    </div>
                )}

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
            </div>
            {errorMessage &&
                ReactDOM.createPortal(
                    <Modal
                        header="Attenzione!"
                        text={[errorMessage]}
                        buttons={[
                            {
                                message: "Chiudi",
                                color: "red",
                                action: () => {
                                    window.location.assign("/immobili");
                                },
                            },
                        ]}
                    />,
                    document.querySelector("body")!
                )}
        </div>
    );
};

export default Immobili;
