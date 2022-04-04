import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
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
import { RootState } from "./store";
import { hideOptions } from "./store/header-slice";

const App: React.FC<{
    id: number;
}> = (props) => {
    const dispatch = useDispatch();
    const isOptionsVisible = useSelector(
        (state: RootState) => state.header.optionsVisibility
    );
    const isSidebarVisible = useSelector(
        (state: RootState) => state.header.sidebarVisibility
    );

    const hideOptionsOpened = () => {
        if (isOptionsVisible) dispatch(hideOptions());
    };

    return (
        <div onClick={hideOptionsOpened}>
            <Header />
            {isSidebarVisible && <Sidebar />}
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/emporio" element={<Emporio />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/immobili" element={<Immobili />} />
                <Route path="/contatti" element={<Contatti />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

/* 
- refactor - vinto
- footer
*/
