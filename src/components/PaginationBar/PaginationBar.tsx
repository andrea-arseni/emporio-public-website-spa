import styles from "./PaginationBar.module.css";
import { ReactComponent as ArrowIcon } from "../../assets/icons/left-arrow.svg";

const PaginationBar: React.FC<{
    numberOfResults: number;
    currentPage: string;
    setSearchParams: (obj: any) => void;
    searchParams: URLSearchParams;
}> = (props) => {
    const numberOfPages = Math.ceil(props.numberOfResults / 20);

    const changePageHandler = (change: 1 | -1) => {
        props.setSearchParams({
            ...props.searchParams,
            page: Number.parseInt(props.currentPage) + change,
        });
    };

    return (
        <div className={`${styles.paginationBar} centered`}>
            <div
                className={styles.arrow}
                onClick={changePageHandler.bind(null, -1)}
            >
                {Number.parseInt(props.currentPage) === 1 ? "" : <ArrowIcon />}
            </div>
            <div>
                {props.numberOfResults} risultati - Pagina {props.currentPage}{" "}
                di {numberOfPages}
            </div>
            <div
                className={`${styles.arrow} ${styles.right}`}
                onClick={changePageHandler.bind(null, +1)}
            >
                {Number.parseInt(props.currentPage) === numberOfPages ? (
                    ""
                ) : (
                    <ArrowIcon />
                )}
            </div>
        </div>
    );
};

export default PaginationBar;
