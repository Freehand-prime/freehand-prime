const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting all categories
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('in get all categories');
  const queryText = `SELECT * FROM "categories";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('received all categories:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in get all categories', error);
      res.sendStatus(500);
    });
});

// MAKE SURE TO ADD ADMIN AUTH FOR POST, DELETE, UPDATE


module.exports = router;
