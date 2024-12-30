import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import matchRouter from './Routes/match.router';
import teamRouter from './Routes/team.router';
import playerRouter from './Routes/player.router';
import couchDbConnection from './couchDbConnection';

const app: Express = express();
const PORT = 3001;

// Abilita il CORS
app.use(cors());

// questo è built-in middleware in Express that is used for parsing incoming requests with JSON payloads
app.use(express.json());

const couch = couchDbConnection;
const DBNAME = 'tbf17';

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', process.env.COUCHDB_URL);
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', process.env.COUCHDB_URL);
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', process.env.COUCHDB_URL);
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', process.env.COUCHDB_URL);

// Verifica se il database esiste, altrimenti crealo
couch.db
  .get(DBNAME)
  .then((body) => {
    console.log(`Database ${DBNAME} already exists.`);
  })
  .catch((err) => {
    if (err.statusCode === 404) {
      couch.db
        .create(DBNAME)
        .then(() => {
          console.log(`Database ${DBNAME} created.`);
        })
        .catch((createErr) => {
          console.error(`Error creating database ${DBNAME}:`, createErr);
        });
    } else {
      console.error(`Error checking database ${DBNAME}:`, err);
    }
  });

const db = couch.db.use(DBNAME);

// Rotta fittizia per il test che genera un errore
app.get('/error', (req, res, next) => {
  const error = new Error('Test error');
  next(error);
});

// Usa i router per le rotte !!!!

app.use('/match', matchRouter);
app.use('/team', teamRouter);
app.use('/player', playerRouter);

// Handle per chiamate non esistenti
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Ooops qualcosa è andato storto...' });
  // next();
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };

// Funzione per inserire un giocatore in CouchDB
// async function insertPlayer() {
//   interface PlayerDocument extends nano.MaybeDocument {
//     type: string;
//     player: {
//       name: string;
//       goals: number;
//       blocks: number;
//     };
//   }

//   const player: PlayerDocument = {
//     _id: 'pluto',
//     type: 'player',
//     player: {
//       name: 'Pluto',
//       goals: 1,
//       blocks: 8
//     }
//   };

//   try {
//     const response = await db.insert(player);
//     console.log('Player inserted successfully:', response);
//   } catch (error) {
//     console.error('Error inserting player:', error);
//   }
// }

// Funzione per inserire un giocatore in CouchDB
// async function insertTeam() {
//   interface PlayerDocument extends nano.MaybeDocument {
//     type: 'striker' | 'defender';
//     name: string;
//     goals: number;
//     blocks: number;
//   }

//   interface TeamDocument extends nano.MaybeDocument {
//     type: string;
//     team: {
//       name: string;
//       players: PlayerDocument[];
//     };
//   }

//   const team: TeamDocument = {
//     _id: '1',
//     type: 'team',
//     team: {
//       name: 'Raging Bulls',
//       players: [
//         {
//           type: 'striker',
//           name: 'Pippo',
//           goals: 5,
//           blocks: 3
//         },
//         {
//           type: 'defender',
//           name: 'Pluto',
//           goals: 1,
//           blocks: 8
//         }
//       ]
//     }
//   };

//   try {
//     const response = await db.insert(team);
//     console.log('Player inserted successfully:', response);
//   } catch (error) {
//     console.error('Error inserting player:', error);
//   }
// }

// insertPlayer();
// insertTeam();
