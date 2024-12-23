import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import nano from 'nano';
import matchRouter from './Routes/match.router';
import teamRouter from './Routes/team.router';
import playerRouter from './Routes/player.router';

const app: Express = express();
const PORT = 3001;

// Abilita il CORS
app.use(cors());

// questo è built-in middleware in Express that is used for parsing incoming requests with JSON payloads
app.use(express.json());

// Configura CouchDB
const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

// Usa i router per le rotte !!!!
app.use('/match', matchRouter);
app.use('/team', teamRouter);
app.use('/player', playerRouter);

// Handle per chiamate non esistenti
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Ooops qualcosa è andato storto...' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
