const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting all events
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('in get all events');
  const queryText = `SELECT "date", "persons".*, "occasion", "category" FROM "events"
      JOIN "persons" ON "events".person_id = "persons".id
      JOIN "occasions" ON "events".occasion_id = "occasions".id
      JOIN "categories" ON "events".category_id = "categories".id
      WHERE "user_id" = $1
      ORDER BY "date";`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log('received all events:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in get all events', error);
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
