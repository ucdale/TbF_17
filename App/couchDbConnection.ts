import nano from 'nano';

const couchDbConnection = nano(
  process.env.COUCHDB_URL || 'http://admin:admin@127.0.0.1:5984'
);

export default couchDbConnection;
