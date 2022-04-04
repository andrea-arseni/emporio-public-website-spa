import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: React.FC<{}> = () => {
    return (
        <footer className={styles.footer}>
            <div>Copyright © {new Date().getFullYear()} - Emporio Case sas</div>
            <div>
                <Link className={styles.link} to="/privacy">
                    Privacy Policy
                </Link>
                <Link className={styles.link} to="/cookies">
                    Cookies Policy
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
