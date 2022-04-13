import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import styles from "./Home.module.css";

type pageType = "valutazione-gratuita" | "richiesta-informazioni";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const moveToFormHandler = (pageType: pageType) => navigate(`/${pageType}`);

    const indexesImages = ["one", "two", "three", "four", "five"];
    const classes = [];

    for (let i = 0; i < 5; i++) {
        classes.push(`${styles.heroImage} ${styles[indexesImages[i]]}`);
    }

    const images = classes.map((el) => <div key={el} className={el}></div>);

    return (
        <div className={styles.home}>
            <div className={styles.jumbotron}>
                <h2>Vuoi una valutazione gratuita?</h2>
                <p>
                    Il primo passo per poter vendere o affittare con successo il
                    proprio immobile è conoscere con precisione il suo valore di
                    mercato.
                    <br />
                    Noi, lavorando nel mercato dal 1985, possiamo fornire sia
                    una valutazione gratuita di un immobile che aiutarvi a
                    risolvere dubbi ed a rispondere alle più variegate domande
                    in tema immobiliare, in modo totalmente gratuito e senza
                    impegno.
                </p>
                <div className={styles.buttons}>
                    <Button
                        color="green"
                        onClick={moveToFormHandler.bind(
                            null,
                            "valutazione-gratuita"
                        )}
                    >
                        Sì, la voglio
                    </Button>
                    <Button
                        color="green_outline"
                        onClick={moveToFormHandler.bind(
                            null,
                            "richiesta-informazioni"
                        )}
                    >
                        Ho una domanda
                    </Button>
                </div>
            </div>
            {images}
        </div>
    );
};

export default Home;
