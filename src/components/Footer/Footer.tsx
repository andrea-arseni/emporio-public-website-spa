import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer: React.FC<{}> = () => {
    return (
        <footer className={styles.footer}>
            <div>
                Copyright © {new Date().getFullYear()}{" "}
                {window.innerWidth > 500 ? "-" : <br />} Emporio Case sas
            </div>
            <div>
                <Link className={styles.link} to="/privacy">
                    Privacy {window.innerWidth > 365 ? "" : <br />} Policy
                </Link>
                <Link className={styles.link} to="/cookies">
                    Cookies {window.innerWidth > 365 ? "" : <br />} Policy
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
