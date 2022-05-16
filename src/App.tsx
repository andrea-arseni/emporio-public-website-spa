import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styles from "./App.module.css";
import CookiesBanner from "./components/CookiesBanner/CookiesBanner";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Contatti from "./pages/Contatti/Contatti";
import Cookies from "./pages/Cookies/Cookies";
import Emporio from "./pages/Emporio/Emporio";
import Home from "./pages/Home/Home";
import Immobile from "./pages/Immobile/Immobile";
import Immobili from "./pages/Immobili/Immobili";
import NotFound from "./pages/NotFound/NotFound";
import Privacy from "./pages/Privacy/Privacy";
import Servizi from "./pages/Servizi/Servizi";
import Servizio from "./pages/Servizio/Servizio";
import Tv from "./pages/Tv/Tv";
import { RootState } from "./store";
import { hideOptions } from "./store/header-slice";
import { hideBanner } from "./store/cookie-slice";

const App: React.FC<{
    id: number;
}> = (props) => {
    const getCookie = (cname: string) => {
        var name = cname + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") c = c.substring(1);
            if (c.indexOf(name) != -1)
                return c.substring(name.length, c.length);
        }
        return "";
    };

    const location = useLocation();
    const dispatch = useDispatch();

    if (getCookie("cookieBannerClicked") === "true") dispatch(hideBanner());

    const isOptionsVisible = useSelector(
        (state: RootState) => state.header.optionsVisibility
    );
    const isSidebarVisible = useSelector(
        (state: RootState) => state.header.sidebarVisibility
    );

    const isCookieBannerVisible = useSelector(
        (state: RootState) => state.cookiesBanner.bannerVisible
    );

    const hideOptionsOpened = () => {
        if (isOptionsVisible) dispatch(hideOptions());
    };

    if (location.pathname === "/tv") return <Tv />;

    return (
        <div className={styles.app} onClick={hideOptionsOpened}>
            <Header />
            <Sidebar isVisible={isSidebarVisible} />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/emporio" element={<Emporio />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/servizi/:serviceName" element={<Servizio />} />
                <Route path="/immobili" element={<Immobili />} />
                <Route path="/immobili/:immobileId" element={<Immobile />} />
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            {isCookieBannerVisible && <CookiesBanner />}
        </div>
    );
};

export default App;

/* 
- Bug Immobili - vinto
- Position fixed per il form - vinto
- Descrizione - vinto
- Caratteristiche principali come simboli - ref - prezzo - superficie - locali - vinto
- No freccia sulle principali - vinto
- Completamento caratteristiche - vinto
- Immagine dimensione - vinto
- Funzionamento freccette
- Memorizzazione altre immagini
- not found page
- select safari bug
- Testing @media
- testing testing testing 
- push * fine sito statico
*/
