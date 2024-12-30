Questa applicazione è un gestore di match di calcio balilla per Molo17. Il progetto include un backend sviluppato con Node.js e Express, e un frontend sviluppato con React. Il backend utilizza CouchDB come database e il frontend è configurato per interagire con il backend.
Una Board di miro per l'analisi e i wireframe è presente qui <a name="miro">https://miro.com/app/board/uXjVL0996mI=/</a>

# Struttura del Progetto
App: Contiene il codice del backend e del frontend.
Presentation/: Contiene il codice del frontend React.
Routes/: Contiene i router per le diverse entità (match, team, player).
Controllers/: Contiene i controller per gestire la logica delle rotte.
DataSources/: Contiene le funzioni per interagire con CouchDB.
index.ts: Punto di ingresso del backend Express.
Prerequisiti
Assicurati di avere installato Node.js e npm sul tuo sistema.

# CouchDB
L'applicazione richieste CouchDB installato, puoi andare sul sito ufficiale (http://couchdb.apache.org/) per scaricarlo e installarlo.
<br/>
**CouchDB deve avere come account name admin e password admin**


# Installazione delle Dipendenze
Per installare tutte le dipendenze necessarie per il progetto, esegui il seguente comando nella radice del progetto:
>npm install

# Esecuzione del Backend
Per avviare il server di sviluppo del backend con nodemon, esegui il seguente comando:
>npm run start:backend

# Esecuzione del Frontend
Per installare le dipendenze del frontend e avviare il server di sviluppo React, esegui i seguenti comandi:

- Installazione delle dipendenze del frontend:
  >npm run install:frontend

- Avvio del server di sviluppo del frontend:
  >npm run start:frontend

# Esecuzione dell'Applicazione Completa
Per avviare sia il frontend che il backend contemporaneamente, esegui il seguente comando:
>npm start

# Esecuzione dei Test Backend
Per eseguire i test dell'applicazione NodeJS, utilizza il seguente comando:
>npm test

# Esecuzione dei Test Frontend
Per eseguire i test dell'applicazione React, utilizza il seguente comando:
>npm run test:frontend

# Linting del Codice
Per eseguire il linting del codice e assicurarti che segua le convenzioni di stile definite, utilizza il seguente comando:
>npm run lint

# Build del Progetto
Per creare una build del progetto TypeScript, utilizza il seguente comando:
>npm run build

# Configurazione del Proxy
Il campo proxy nel file package.json è configurato per indirizzare le richieste API al backend durante lo sviluppo. Questo è utile per evitare problemi di CORS durante lo sviluppo locale.
>"proxy": "http://localhost:3001"
