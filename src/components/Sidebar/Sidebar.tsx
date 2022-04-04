import styles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { hideSidebar } from "../../store/header-slice";
import NavItem from "../UI/NavItem/NavItem";
import ImmobiliNavItem from "../UI/ImmobiliNavItem/ImmobiliNavItem";

const Sidebar: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const hideSidebarHandler = () => dispatch(hideSidebar());

    return (
        <div className={styles.gray}>
            <nav className={styles.sidebar}>
                <ul className={styles.list}>
                    <li onClick={hideSidebarHandler}>
                        <NavItem type="sidebar" name="emporio" />
                    </li>
                    <li onClick={hideSidebarHandler}>
                        <NavItem type="sidebar" name="servizi" />
                    </li>
                    <li>
                        <ImmobiliNavItem type="sidebar" />
                    </li>
                    <li onClick={hideSidebarHandler}>
                        <NavItem name="contatti" type="sidebar" />
                    </li>
                </ul>
            </nav>
            <div className={styles.backdrop} onClick={hideSidebarHandler}></div>
        </div>
    );
};

export default Sidebar;
