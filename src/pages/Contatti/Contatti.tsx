import Map from "../../components/Map/Map";
import styles from "./Contatti.module.css";

const Contatti: React.FC = () => {
    return (
        <div
            className={`page container-fluid text-center fullHeight ${styles.contatti}`}
        >
            <div className="row fullHeight fullWidth">
                <div className="col-md-6 ">
                    <div className={`vertical fullHeight ${styles.dati} `}>
                        <p>
                            <i className="bi bi-shop rightSpace"></i>Indirizzo
                            Sede
                            <br />
                            Via Gramsci, 34 - 20054 Segrate (MI)
                        </p>
                        <p>
                            <i className="bi bi-clock rightSpace"></i>Orari di
                            Apertura
                            <br />
                            Da Lunedì a Venerdì: 09.30-13.00 e 15.00-18.30
                            <br />
                            Sabato: 09.30-12.30
                        </p>
                        <p>
                            <i className={`rightSpace bi bi-telephone`}></i>
                            Telefono
                            <br />
                            <a href="tel:0226922027">02 2692 2027</a>
                        </p>
                        <p>
                            <i className={`rightSpace bi bi-envelope`}></i>
                            Email
                            <br />
                            <a href="mailto:info@emporiocase.com">
                                emporiocase@emporiocase.com
                            </a>
                        </p>
                        <p>
                            <i className="rightSpace bi bi-whatsapp"></i>Numero
                            WhatsApp
                            <br />
                            <a href="tel:3517035998">+39 351 7035 998</a>
                        </p>
                    </div>
                </div>
                <div className={`col-md-6 ${styles.mapCol}`}>
                    <Map />
                </div>
            </div>
        </div>
    );
};

export default Contatti;
