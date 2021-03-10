const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// route for getting user's persons
router.get('/', (req, res) => {
  // GET route code here
  console.log('in get persons');
  queryText = `SELECT "persons".*, COUNT("events".person_id) as "num_events" FROM "persons"
  JOIN "events" ON "persons".id = "events".person_id
  WHERE "persons".user_id = $1
  GROUP BY "persons".id;`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log('received persons', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in get persons,', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
