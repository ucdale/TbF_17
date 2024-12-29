import nano from 'nano';
import { isMatchType, MatchType } from '../Models/Match';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

export const allMatches = async (): Promise<MatchType[]> => {
  const response = await db.find({ selector: { type: 'match' } });
  const matches = response.docs.map((doc: any) => ({
    _id: doc._id,
    ...doc.match
  }));
  return matches;
};

export const matchById = async (id: string): Promise<MatchType> => {
  const matchDoc = await db.get(id);

  if (!isMatchType(matchDoc)) {
    // TODO lanciare eccezione
    // res.status(400).json({ error: 'Invalid match document' });
    throw new Error('Invalid "match" document');
  }

  return matchDoc;
};
