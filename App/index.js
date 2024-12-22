const express = require('express');
const app = express();

app.listen(3001, () => {    
    console.log('Server is running on port 3001');
});

const nano = require('nano')('http://admin:admin@127.0.0.1:5984');
const db = nano.db.use('tbf17');

// Inserisci un documento nel database
db.insert({ name: 'Pinco Pallo' }, null, (err, body) => {
  if (err) {
    console.log('Error inserting document:', err);
  } else {
    console.log('Document inserted:', body);
  }
});

// Elenca tutti i documenti nel database
db.list({ include_docs: true }, (err, body) => {
  if (err) {
    console.log('Error listing documents:', err);
  } else {
    console.log('Documents:', body.rows);
  }
});