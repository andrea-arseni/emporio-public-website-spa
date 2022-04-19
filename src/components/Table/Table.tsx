import styles from "./Table.module.css";
import { contacts } from "../../static-data/contacts";

const Table: React.FC<{}> = () => {
    const contactList = contacts.map((el) => (
        <tr className={styles.row} key={el.telefono}>
            <td>{el.name}</td>
            <td>
                <a className="link" href={`tel:${el.telefono}`}>
                    {window.innerWidth > 900 ||
                    (window.innerWidth < 700 && window.innerWidth > 600)
                        ? el.telefono
                        : "Chiama"}
                </a>
            </td>
            <td>
                <a className="link" href={`mailto:${el.email}`}>
                    {window.innerWidth > 1100 ||
                    (window.innerWidth < 700 && window.innerWidth > 600)
                        ? el.email
                        : "Email"}
                </a>
            </td>
        </tr>
    ));

    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.trow}>
                    <th>Nome</th>
                    <th>Telefono</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>{contactList}</tbody>
        </table>
    );
};

export default Table;
