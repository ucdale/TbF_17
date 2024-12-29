import nano from 'nano';
import { isPlayerType, PlayerType } from '../Models/Player';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

export const allPlayers = async (): Promise<PlayerType[]> => {
  const response = await db.find({ selector: { type: 'player' } });
  const players = response.docs.map((doc: any) => ({
    _id: doc._id,
    ...doc.player
  }));
  return players;
};

export const playerById = async (id: string): Promise<PlayerType> => {
  const playerDoc = await db.get(id);

  if (!isPlayerType(playerDoc)) {
    // TODO lanciare eccezione
    // res.status(400).json({ error: 'Invalid player document' });
    throw new Error('Invalid "player" document');
  }

  return playerDoc;
};

export const searchPlayersByName = async (
  term: string,
  excludeName: string
): Promise<PlayerType[]> => {
  // Costruisci il selettore per filtrare i giocatori in base al termine di ricerca e al nome da escludere
  const selector: any = {
    type: 'player',
    'player.name': { $regex: term ? `(?i)${term}` : '' }
  };

  if (excludeName) {
    selector['player.name'].$ne = excludeName;
  }

  const response = await db.find({ selector });
  const players = response.docs.map((doc: any) => ({
    _id: doc._id,
    ...doc.player
  }));

  return players;
};
