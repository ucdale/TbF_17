import request from 'supertest';
import { app, server } from './index'; // Adjust the path as necessary

describe('Express App', () => {
  afterAll((done) => {
    server.close(done); // Chiudi il server dopo i test
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Endpoint not found' });
  });

  it('should handle errors with the error handling middleware', async () => {
    // Mock a route that throws an error
    app.get('/error', (req, res, next) => {
      const error = new Error('Test error');
      next(error);
    });

    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Ooops qualcosa è andato storto...'
    });
  });

  it('should handle /match routes', async () => {
    const response = await request(app).get('/match/getAllMatches');
    expect(response.status).not.toBe(404);
  });

  it('should handle /team routes', async () => {
    const response = await request(app).get('/team/getAllTeams');
    expect(response.status).not.toBe(404);
  });

  it('should handle /player routes', async () => {
    const response = await request(app).get('/player/getAllPlayers');
    expect(response.status).not.toBe(404);
  });
});
