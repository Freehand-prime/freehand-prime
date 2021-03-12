const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting all occasions
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('in get all occasions');
  const queryText = `SELECT * FROM "occasions";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('received all occasions:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in get all occasions', error);
      res.sendStatus(500);
    });
});


// MAKE SURE TO ADD ADMIN AUTH FOR POST, DELETE, UPDATE

module.exports = router;
