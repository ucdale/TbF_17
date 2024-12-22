import express, { Express, Request, Response } from "express";
const cors = require('cors');
const app = express();
const matchRouter = require('./Routes/match.router');

// Abilita il CORS
app.use(cors());

// Usa il router per le rotte /match
app.use('/match', matchRouter);

// Handle per chiamate non esistenti
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ooops qualcosa è andato storto...' });
});

const PORT = 3001;

const nano = require('nano')('http://admin:admin@127.0.0.1:5984');
const db = nano.db.use('tbf17');

let documents = [];

// Inserisci un documento nel database
// db.insert({ name: 'Pinco Pallo' }, null, (err, body) => {
//   if (err) {
//     console.log('Error inserting document:', err);
//   } else {
//     console.log('Document inserted:', body);
//   }
// });

// Elenca tutti i documenti nel database
// db.list({ include_docs: true }, (err, body) => {
//   if (err) {
//     console.log('Error listing documents:', err);
//   } else {
//     console.log('Documents:', body.rows);
//     documents = body.rows.map(row => row.doc)
//   }
// });

// app.get("/api/users", (req, res) => {
//   return res.json(documents);
// });

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});


