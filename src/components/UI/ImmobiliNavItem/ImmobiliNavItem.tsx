import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ReactComponent as CaretDown } from "../../../assets/caret-down-outline.svg";
import styles from "./ImmobiliNavItem.module.css";
import {
    toggleOptionsVisibility,
    hideSidebar,
} from "../../../store/header-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";

type categoriaType = "Tutti" | "Residenziale" | "Commerciale";
type contrattoType = "Tutti" | "Vendita" | "Affitto";

const ImmobiliNavItem: React.FC<{ type: "header" | "sidebar" }> = (props) => {
    const isOptionsVisible = useSelector(
        (state: RootState) => state.header.optionsVisibility
    );

    const location = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const optionsVisibilityToggler = () => dispatch(toggleOptionsVisibility());

    const hideSidebarHandler = () => dispatch(hideSidebar());

    const navigateToFilteredHouses = (
        contratto: contrattoType,
        categoria: categoriaType
    ) => {
        hideSidebarHandler();
        optionsVisibilityToggler();
        navigate(`/immobili?contratto=${contratto}&categoria=${categoria}`);
    };

    const classImmobileNavItem = `immobileNavItem_${props.type}`;

    return (
        <Fragment>
            <div
                className={`${styles[classImmobileNavItem]} ${
                    location.pathname.startsWith("/immobili")
                        ? styles.active
                        : ""
                }`}
                onClick={optionsVisibilityToggler}
            >
                Immobili
                <CaretDown
                    className={styles.caret}
                    style={{
                        position: "relative",
                        top: "3px",
                    }}
                />
            </div>
            {isOptionsVisible && (
                <div className={styles.options}>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("Tutti", "Tutti")
                        }
                    >
                        Tutti gli Immobili
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("Tutti", "Residenziale")
                        }
                    >
                        Solo Residenziali
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("Tutti", "Commerciale")
                        }
                    >
                        Solo Commerciali
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("Vendita", "Tutti")
                        }
                    >
                        Solo in Vendita
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("Affitto", "Tutti")
                        }
                    >
                        Solo in Affitto
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default ImmobiliNavItem;
