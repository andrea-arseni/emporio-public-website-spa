import Button from "../UI/Button/Button";
import styles from "./Modal.module.css";
import { color } from "../UI/Button/Button";

const Modal: React.FC<{
    header?: string;
    text: string[];
    buttons?: { message: string; color: color; action: () => void }[];
}> = (props) => {
    const text = props.text.map((el) => <span key={el}>{el}</span>);

    const buttons = !props.buttons
        ? []
        : props.buttons.map((el) => (
              <Button key={el.message} onClick={el.action} color={el.color}>
                  {el.message}
              </Button>
          ));

    return (
        <div className={`${styles.backdrop} centered`}>
            <div className={`${styles.modal} centered`}>
                <header className={`${styles.header} centered`}>
                    {props.header}
                </header>
                <main className={`${styles.main} centered`}>{text}</main>
                <footer className={`${styles.footer}`}>{buttons}</footer>
            </div>
        </div>
    );
};

export default Modal;
