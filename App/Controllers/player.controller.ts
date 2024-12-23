class PlayerController {
  static getAllPlayers(req, res) {
    // Fetch players data from your database or any other source
    const players = [
      // esempio di dati
      {
        name: 'Pippo',
        goals: 2,
        blocks: 0
      },
      {
        name: 'Pluto',
        goals: 1,
        blocks: 4
      },
      {
        name: 'Paperino',
        goals: 0,
        blocks: 0
      },
      {
        name: 'Gastonew',
        goals: 1,
        blocks: 10
      }
    ];

    res.json({ players });
  }
}

module.exports = PlayerController;
