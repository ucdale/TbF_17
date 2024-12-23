class TeamController {
  static getAllTeams(req, res) {
    // Fetch teams data from your database or any other source
    const teams = [
      // esempio di dati
      {
        name: 'Ragind Bulls',
        players: [
          { type: 'striker', name: 'pippo' },
          { type: 'defender', name: 'pluto' }
        ]
      },
      {
        name: 'Quacking Ducks',
        players: [
          { type: 'striker', name: 'paperino' },
          { type: 'defender', name: 'gastone' }
        ]
      }
    ];

    res.json({ teams });
  }
}

module.exports = TeamController;
