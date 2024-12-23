import { Request, Response } from 'express';
import nano from 'nano';

const couch = nano('http://admin:admin@127.0.0.1:5984');
const db = couch.db.use('tbf17');

class PlayerController {
  static async getAllPlayers(req: Request, res: Response): Promise<void> {
    try {
      const response = await db.find({ selector: { type: 'player' } });
      res.json(response.docs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching players' });
    }
  }

  static async createPlayer(req: Request, res: Response): Promise<void> {
    try {
      const player = req.body;
      player.type = 'player';
      const response = await db.insert(player);
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error creating player' });
    }
  }
}

export default PlayerController;
