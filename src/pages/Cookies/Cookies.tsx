import styles from "../Privacy/Privacy.module.css";

const Cookies: React.FC = () => {
    return (
        <div className={`page ${styles.privacy}`}>
            <h1>COOKIES</h1>
            <p>
                I cookie sono piccoli file di testo inviati dal sito al
                terminale dell’interessato (solitamente al browser), dove
                vengono memorizzati per essere poi ritrasmessi al sito alla
                successiva visita del medesimo utente. Un cookie non può
                richiamare nessun altro dato dal disco fisso dell’utente né
                trasmettere virus informatici o acquisire indirizzi email. Ogni
                cookie è unico per il web browser dell’utente. Alcune delle
                funzioni dei cookie possono essere demandate ad altre
                tecnologie. Nel presente documento con il termine ‘cookie’ si
                vuol far riferimento sia ai cookie, propriamente detti, sia a
                tutte le tecnologie similari come le variabili di sessione.{" "}
            </p>
            <h2>TIPOLOGIA DEI COOKIE</h2>
            <p>
                I cookie possono essere di prima o di terza parte, dove per
                “prima parte” si intendono i cookie che riportano come dominio
                il sito, mentre per “terza parte” si intendono i cookie che sono
                relativi a domini esterni. I cookie di terza parte sono
                necessariamente installati da un soggetto esterno, sempre
                definito come “terza parte”, non gestito dal sito (es. Google
                Maps, YouTube etc.). Di seguito si descrivono le tipologie di
                cookie più comuni:
            </p>{" "}
            <ul>
                <li>
                    <h3>COOKIE TECNICI</h3>
                    <div>
                        I cookie tecnici sono quelli utilizzati al solo fine di
                        “effettuare la trasmissione di una comunicazione su una
                        rete di comunicazione elettronica, o nella misura
                        strettamente necessaria al fornitore di un servizio
                        della società dell’informazione esplicitamente richiesto
                        dall’abbonato o dall’utente a erogare tale servizio”
                        (cfr. art. 122, comma 1, del Codice). Essi non vengono
                        utilizzati per scopi ulteriori e sono normalmente
                        installati direttamente dal titolare o gestore del sito
                        web. Possono essere suddivisi in:
                        <br />
                        <br />
                        <ul>
                            <li>
                                <p>
                                    cookie di navigazione o di sessione, che
                                    garantiscono la normale navigazione e
                                    fruizione del sito web (permettendo, ad
                                    esempio, di realizzare un acquisto o
                                    autenticarsi per accedere ad aree
                                    riservate); essi sono di fatto necessari per
                                    il corretto funzionamento del sito. I cookie
                                    di sessione non sono memorizzati in modo
                                    persistente sul dispositivo dell'utente e
                                    vengono cancellati automaticamente alla
                                    chiusura del browser.
                                </p>
                            </li>
                            <li>
                                <p>
                                    cookie analytics, assimilati ai cookie
                                    tecnici laddove utilizzati direttamente dal
                                    gestore del sito per raccogliere
                                    informazioni, in forma aggregata, sul numero
                                    degli utenti e su come questi visitano il
                                    sito stesso, al fine di migliorare le
                                    performance del sito.
                                </p>
                            </li>
                            <li>
                                <p>
                                    cookie di funzionalità, che permettono
                                    all’utente la navigazione in funzione di una
                                    serie di criteri selezionati (ad esempio, la
                                    lingua, i prodotti selezionati per
                                    l’acquisto) al fine di migliorare il
                                    servizio reso allo stesso.
                                </p>
                            </li>
                        </ul>{" "}
                    </div>
                </li>
                <li>
                    <h3>COOKIE DI PROFILAZIONE</h3>
                    <p>
                        I cookie di profilazione sono volti a creare profili
                        relativi all’utente e vengono utilizzati al fine di
                        inviare messaggi pubblicitari in linea con le preferenze
                        manifestate dallo stesso nell’ambito della navigazione
                        in rete. Queste tecnologie non collezionano nome degli
                        utenti, indirizzi mail, numeri di telefono, indirizzi
                        fisici. Per l’utilizzo dei cookie di profilazione è
                        richiesto il consenso dell’interessato. Il sito in
                        questione non utilizza cookie di profilazione. In caso
                        di cookie di terze parti, il sito non ha un controllo
                        diretto dei singoli cookie e non può controllarli (non
                        può né installarli direttamente né cancellarli).
                        L'utente può gestire questi cookie attraverso le
                        impostazioni del browser come descritto in seguito.
                    </p>
                </li>
                <li>
                    <h3>COOKIE ANALYTICS</h3>
                    <p>
                        Sono utilizzati per raccogliere informazioni, in forma
                        aggregata, sul numero degli utenti e su come gli stessi
                        visitano il Sito. Il sito si avvale del servizio Google
                        Analytics, la cui cookie policy può essere visionata a{" "}
                        <a href="https://support.google.com/analytics/answer/6004245">
                            questo indirizzo
                        </a>
                        .
                    </p>
                </li>
            </ul>
            <h2>GESTIONE DEI COOKIE </h2>
            <p>
                L’Utente ha la facoltà in qualsiasi momento di esercitare i
                diritti riconosciuti dall’art. 7 del Codice in materia di
                protezione dei dati personali (d.lgs. 30 giugno 2003, n. 196 e
                s.m.i) e dal Regolamento UE 2016/679 ed, in particolare, tra gli
                altri, di ottenere copia dei dati trattati, il loro
                aggiornamento, la loro origine, la finalità e la modalità del
                trattamento, la loro rettifica o integrazione, la loro
                cancellazione, la trasformazione in forma anonima o il blocco
                per i trattamenti in violazione di legge e di opporsi per motivi
                legittimi al trattamento. L’Utente può scegliere di abilitare o
                disabilitare i cookies intervenendo sulle impostazioni del
                proprio browser di navigazione secondo le istruzioni rese
                disponibili dai relativi fornitori ai link di seguito:
            </p>{" "}
            <ul>
                <li>
                    <a href="https://support.google.com/chrome/answer/95647?hl=eng">
                        CHROME
                    </a>
                </li>
                <li>
                    <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie#w_impostazioni-dei-cookie">
                        FIREFOX
                    </a>
                </li>
                <li>
                    <a href="https://support.apple.com/it-it/HT201265">
                        SAFARI
                    </a>
                </li>
                <li>
                    <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
                        EDGE
                    </a>
                </li>
                <li>
                    <a href="https://blogs.opera.com/news/2015/08/how-to-manage-cookies-in-opera/">
                        OPERA
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Cookies;
