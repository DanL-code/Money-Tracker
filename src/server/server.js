
const express = require('express');
const cors = require('cors');
// const mysql = require('mysql'); // for localhost
const mysql = require('mysql2'); // for cloud

const app = express();

app.use(cors());
app.use(express.json());

// // localhost connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'expense_tracker',
// });

// cloud connection
const db = mysql.createConnection({
  host: 'expense-tracker.********.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'expense_tracker',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database');
  }
});

const PORT = process.env.PORT || 5000;

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE user_name = ? AND password = ?';

  console.log('login query: ', username, password);

  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Database error');
    } else if (result.length > 0) {
      res.json({ success: true, message: 'Login successful', username });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/create-account', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (user_name, password) VALUES (?, ?)';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      const query1 = 'INSERT INTO transactions (username, current_amount) VALUES (?, 0)';

      db.query(query1, [username], (err, result) => {
        if (err) {
         res.status(500).send('Database error');
        } else {
          res.json({ success: true, message: 'Account created successfully' });
        }
      });
    }
  });

});

app.get('/api/records/:username', (req, res) => {
  const username = req.params.username;
  console.log('Received request for username:', username);

  const query = 'SELECT * FROM records WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Sending records:', results);
      res.json(results);
    }
  });
});

app.post('/api/records/add', (req, res) => {
  const { record_id, username, detail, amount, date, type, tag } = req.body;
  const query = 'INSERT INTO records (record_id, username, detail, amount, date, type, tag) VALUES (?, ?, ?, ?, ?, ?, ?)';
  console.log('added infor:', record_id, username, detail, amount, date, type, tag);
  db.query(query, [record_id, username, detail, amount, date, type, tag], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Database error' });
    } else {
      res.json({ success: true, message: 'Record added successfully' });
    }
  });
});

app.delete('/api/records/delete/:id', (req, res) => {
  const recordId = req.params.id;
  const query = 'DELETE FROM records WHERE record_id = ?';

  db.query(query, [recordId], (err, result) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json({ success: true, message: 'Record deleted successfully' });
    }
  });
});

app.get('/api/transactions/:username', (req, res) => {
  const username = req.params.username;
  console.log('Received request for username:', username);

  const query = 'SELECT current_amount FROM transactions WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ success: false, error: 'Database error' });
    } else {
      console.log('Sending records:', results);
      if (results.length > 0 && 'current_amount' in results[0]) {
        const currentAmountValue = results[0].current_amount;
        res.json({ success: true, current_amount: currentAmountValue });
      } else {
        res.json({ success: true, current_amount: null, message: 'No results found.' });
      }
    }
  });
});


app.post('/api/transactions/update_amount', (req, res) => {
  const { username, current_amount } = req.body;

  const query = 'UPDATE transactions SET current_amount = ? WHERE username = ?';
  console.log('updated infor:', username, current_amount);
  db.query(query, [ current_amount, username ], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Database error' });
    } else {
      res.json({ success: true, message: 'Record updated successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
