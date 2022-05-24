import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

const container = document.getElementById("root")!;

const root = ReactDOMClient.createRoot(container);

root.render(
    <React.StrictMode>
        <GoogleReCaptchaProvider reCaptchaKey="6LfRA3EfAAAAAEPxX-v4VzebIYDTBHFBTxncbBDX">
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </GoogleReCaptchaProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
