import { Request, Response } from 'express';
import nano from 'nano';
import { v4 as uuidv4 } from 'uuid';
import {
  allPlayers,
  playerById,
  searchPlayersByName
} from '../DataSources/player.dataSource';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class PlayerController {
  static async getAllPlayers(req: Request, res: Response): Promise<void> {
    try {
      const players = await allPlayers();

      res.json(players);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error fetching players' });
    }
  }

  static async getAllEligiblePlayersByName(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { term, excludeName } = req.query;

      const players = await searchPlayersByName(
        term as string,
        excludeName as string
      );

      res.json(players);
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error fetching players' });
    }
  }

  static async createPlayer(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const playerDoc = {
        _id: uuidv4(),
        type: 'player',
        player: {
          name,
          goals: 0,
          blocks: 0
        }
      };

      const response = await db.insert(playerDoc);
      res.json({ success: response.ok, _id: response.id, ...playerDoc.player });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error creating player' });
    }
  }

  static async updatePlayerName(req: Request, res: Response): Promise<void> {
    try {
      const { id, name } = req.body;

      // sotto si può usare db.head per avere solo l'header del documento (con il rev)
      const playerDoc = await playerById(id);

      playerDoc.player.name = name;

      const response = await db.insert({
        ...playerDoc,
        _rev: playerDoc._rev // Include the _rev to update the existing document
      });
      res.json({ success: response.ok, _id: response.id, ...playerDoc.player });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error updating player name' });
    }
  }

  static async updatePlayerGoals(req: Request, res: Response): Promise<void> {
    try {
      const { id, goals } = req.body;

      // sotto si può usare db.head per avere solo l'header del documento (con il rev)
      const playerDoc = await playerById(id);

      playerDoc.player.goals = playerDoc.player.goals + goals;

      const response = await db.insert({
        ...playerDoc,
        _rev: playerDoc._rev // Include the _rev to update the existing document
      });
      res.json({ success: response.ok, _id: response.id, ...playerDoc.player });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || 'Error updating player goals' });
    }
  }

  static async deletePlayer(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;

      // Fetch the existing player document to get the _rev
      const playerDoc = await playerById(id);

      // Delete the document using the id and _rev
      const response = await db.destroy(id, playerDoc._rev);
      res.json({ success: response.ok, _id: response.id });
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error deleting player' });
    }
  }
}

export default PlayerController;
