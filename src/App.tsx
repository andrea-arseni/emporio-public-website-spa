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
import Immobili from "./pages/Immobili/Immobili";
import NotFound from "./pages/NotFound/NotFound";
import Privacy from "./pages/Privacy/Privacy";
import Servizi from "./pages/Servizi/Servizi";
import Servizio from "./pages/Servizio/Servizio";
import Tv from "./pages/Tv/Tv";
import { RootState } from "./store";
import { hideOptions } from "./store/header-slice";

const App: React.FC<{
    id: number;
}> = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

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
- creazione lista - vinta
- unione liste - vinta
- aggiornamento lista fatto bene - vinta
- testing tv - vinta 
- static record in più mamma - vinto
- git push
- nested route
*/
