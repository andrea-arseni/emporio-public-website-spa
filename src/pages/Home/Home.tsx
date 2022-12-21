import { Fragment } from "react";
import styles from "./Home.module.css";
import ImagesBackdrop from "../../components/ImagesBackdrop/ImagesBackdrop";
import useWindowSize from "../../hooks/use-size";
import { useNavigate } from "react-router-dom";

const Home: React.FC<{}> = () => {
    const [width] = useWindowSize();

    const navigate = useNavigate();

    const goSomewhere = (type: "servizi" | "contattaci") =>
        navigate("/" + type);

    return (
        <Fragment>
            <div className={`page`}>
                <div className="container text-center fullHeight">
                    <div className="row fullHeight">
                        <div className="col-sm-1 col-md-2   "></div>
                        <div className="col-12 col-sm-10 col-md-8  fullHeight fullWidth centered">
                            <div className={styles.frame}>
                                <div className="backdrop"></div>
                                <div className="foreGround centered vertical bordered">
                                    {width >= 1000 && (
                                        <h1 style={{ fontWeight: "lighter" }}>
                                            Professionisti del mondo immobiliare
                                        </h1>
                                    )}
                                    {width < 1000 && width >= 800 && (
                                        <h2 style={{ fontWeight: "lighter" }}>
                                            Professionisti del mondo immobiliare
                                        </h2>
                                    )}
                                    {width < 800 && (
                                        <h3 style={{ fontWeight: "lighter" }}>
                                            Professionisti del mondo immobiliare
                                        </h3>
                                    )}
                                    <br />
                                    <p>
                                        {" "}
                                        Operiamo nel mercato dal 1985, possiamo
                                        sia fornire una valutazione gratuita di
                                        un immobile sia rispondere alle più
                                        variegate domande in tema immobiliare,
                                        in modo totalmente gratuito e senza
                                        impegno.
                                    </p>
                                    <br />
                                    <div className={styles.buttons}>
                                        <button
                                            className="btn btn-primary bordered"
                                            onClick={() =>
                                                goSomewhere("contattaci")
                                            }
                                        >
                                            Contattaci
                                        </button>
                                        <button
                                            className="btn btn-outline-light"
                                            onClick={() =>
                                                goSomewhere("servizi")
                                            }
                                        >
                                            {width > 600
                                                ? "I Nostri Servizi"
                                                : "Servizi"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-2  "></div>
                    </div>
                </div>
            </div>
            <ImagesBackdrop />
        </Fragment>
    );
};

export default Home;
