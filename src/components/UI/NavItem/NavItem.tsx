import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css";

const NavItem: React.FC<{ name: string; type: "header" | "sidebar" }> = (
    props
) => {
    const normalClass = `navLink_${props.type}`;
    const activeClass = `active_${props.type}`;

    return (
        <NavLink
            className={({ isActive }) =>
                isActive
                    ? `${styles[activeClass]} ${styles[normalClass]}`
                    : `${styles[normalClass]}`
            }
            to={`/${props.name}`}
        >
            {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
        </NavLink>
    );
};

export default NavItem;
