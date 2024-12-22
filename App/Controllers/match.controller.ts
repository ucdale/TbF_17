class MatchController {
    static getAllMatches(req, res) {
      // Fetch matchs data from your database or any other source
      const matchs = [
        // esempio di dati
        {
          teamRed: {
              name: 'Red Team',
              players: [{name: 'pippo', goals:0, blocks:2}, {name: 'pluto', goals:0, blocks:1}],
              score: 0
          },
          teamBlue: {
              name: 'Blue Team',
              players: [{name: 'paperino', goals:1, blocks:2}, {name: 'gastone', goals:0, blocks:1}],
              score: 1
          },
          status: 'ongoing',
          date: new Date()
      }
      ];

      res.json({ matchs });
    }

    // Add more methods for handling match-related functionality
  }

module.exports = MatchController;