import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ReactComponent as CaretDown } from "../../../assets/caret-down-outline.svg";
import styles from "./ImmobiliNavItem.module.css";
import {
    toggleOptionsVisibility,
    hideSidebar,
} from "../../../store/header-slice";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

type categoriaType = "tutti" | "residenziale" | "commerciale";
type contrattoType = "tutti" | "vendita" | "affitto";

const ImmobiliNavItem: React.FC<{ type: "header" | "sidebar" }> = (props) => {
    const isOptionsVisible = useSelector(
        (state: RootState) => state.header.optionsVisibility
    );

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
                className={`${styles[classImmobileNavItem]}`}
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
                            navigateToFilteredHouses("tutti", "residenziale")
                        }
                    >
                        Residenziali
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("tutti", "commerciale")
                        }
                    >
                        Commerciali
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("vendita", "tutti")
                        }
                    >
                        In Vendita
                    </div>
                    <div
                        onClick={() =>
                            navigateToFilteredHouses("affitto", "tutti")
                        }
                    >
                        In Affitto
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default ImmobiliNavItem;
