class MatchController {
  static getAllMatches(req, res) {
    // Fetch matches data from your database or any other source
    const matches = [
      // esempio di dati
      {
        teamRed: {
          name: 'Ragind Bulls',
          players: [
            { type: 'striker', name: 'pippo', goals: 0, blocks: 2 },
            { type: 'defender', name: 'pluto', goals: 0, blocks: 1 }
          ],
          score: 0
        },
        teamBlue: {
          name: 'Quacking Ducks',
          players: [
            { type: 'striker', name: 'paperino', goals: 1, blocks: 2 },
            { type: 'defender', name: 'gastone', goals: 0, blocks: 1 }
          ],
          score: 1
        },
        status: 'ongoing',
        date: new Date()
      },
      {
        teamRed: {
          name: 'Ragind Bulls',
          players: [
            { type: 'striker', name: 'pippo', goals: 0, blocks: 2 },
            { type: 'defender', name: 'pluto', goals: 0, blocks: 1 }
          ],
          score: 8
        },
        teamBlue: {
          name: 'Quacking Ducks',
          players: [
            { type: 'striker', name: 'paperino', goals: 1, blocks: 2 },
            { type: 'defender', name: 'gastone', goals: 0, blocks: 1 }
          ],
          score: 4
        },
        status: 'completed',
        date: new Date(new Date().setDate(new Date().getDate() - 1))
      }
    ];

    res.json({ matches });
  }

  // Add more methods for handling match-related functionality
}

module.exports = MatchController;
