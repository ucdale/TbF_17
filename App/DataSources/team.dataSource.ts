import couchDbConnection from '../couchDbConnection';
import { isTeamType, TeamType } from '../Models/Team';

const couch = couchDbConnection;
const db = couch.db.use('tbf17');

export const allTeams = async (): Promise<TeamType[]> => {
  const response = await db.find({ selector: { type: 'team' } });
  const teams = response.docs.map((doc: any) => ({
    _id: doc._id,
    ...doc.team
  }));
  return teams;
};

export const teamById = async (id: string): Promise<TeamType> => {
  const teamDoc = await db.get(id);

  if (!isTeamType(teamDoc)) {
    // TODO lanciare eccezione
    // res.status(400).json({ error: 'Invalid team document' });
    throw new Error('Invalid "team" document');
  }

  return teamDoc;
};

export const searchTeamsByName = async (
  term: string,
  excludeName: string
): Promise<TeamType[]> => {
  // Costruisci il selettore per filtrare i giocatori in base al termine di ricerca e al nome da escludere
  const selector: any = {
    type: 'team',
    'team.name': { $regex: term ? `(?i)${term}` : '' }
  };

  if (excludeName) {
    selector['team.name'].$ne = excludeName;
  }

  const response = await db.find({ selector });
  const teams = response.docs.map((doc: any) => ({
    _id: doc._id,
    ...doc.team
  }));

  return teams;
};
