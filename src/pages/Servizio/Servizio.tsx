import { services } from "../../static-data/services";
import ContactForm from "../../components/ContactForm/ContactForm";
import TextMessage from "../../components/TextMessage/TextMessage";
import { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";

const Servizio: React.FC<{}> = () => {
    const location = useLocation();

    const key = location.pathname.split("/").pop();

    let serviceTitle = null;
    let serviceMessage = null;

    const service = services.find((el) => el.name === key);
    try {
        serviceTitle = (
            <h2 style={{ fontWeight: "normal" }}>{service!.title}</h2>
        );
        const textArray = service!.message;
        serviceMessage = textArray.map((el, index) => <p key={index}>{el}</p>);
    } catch (e) {
        return <Navigate to="/" />;
    }

    return (
        <Fragment>
            <div className={`page row blue`}>
                <div className="col-6 centered">
                    <TextMessage>
                        {serviceTitle}
                        {serviceMessage}
                    </TextMessage>
                </div>
                <div className="col-6 centered">
                    <ContactForm />
                </div>
            </div>
        </Fragment>
    );
};

export default Servizio;
