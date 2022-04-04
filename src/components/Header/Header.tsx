import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useDispatch } from "react-redux";
import { toggleSidebarVisibility, hideSidebar } from "../../store/header-slice";
import NavItem from "../UI/NavItem/NavItem";
import ImmobiliNavItem from "../UI/ImmobiliNavItem/ImmobiliNavItem";

const Header: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const sidebarVisibilityToggler = () => dispatch(toggleSidebarVisibility());

    const navigate = useNavigate();

    const navigateHomeHandler = () => {
        dispatch(hideSidebar());
        navigate("/home");
    };

    return (
        <Fragment>
            <div className={styles.upperHeader}>
                <a href="tel:0226922027">02 2692 2027</a>
                <a href="mailto:info@emporiocase.com">info@emporiocase.com</a>
            </div>
            <header className={styles.lowerHeader}>
                <img
                    onClick={navigateHomeHandler}
                    className={styles.logo}
                    src={logo}
                    alt="Logo non disponibile"
                />
                <div
                    className={styles.hamburger}
                    onClick={sidebarVisibilityToggler}
                >
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.list}>
                        <li>
                            <NavItem name="emporio" type="header" />
                        </li>
                        <li>
                            <NavItem name="servizi" type="header" />
                        </li>
                        <li>
                            <ImmobiliNavItem type="header" />
                        </li>
                        <li>
                            <NavItem name="contatti" type="header" />
                        </li>
                    </ul>
                </nav>
            </header>
        </Fragment>
    );
};

export default Header;
