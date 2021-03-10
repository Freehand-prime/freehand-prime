const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

// route for getting most recent event
router.get('/recent', rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log('in get recent event');
  const queryText = `SELECT "date", "persons".*, "occasion", "category" FROM "events"
    JOIN "persons" ON "events".person_id = "persons".id
    JOIN "occasions" ON "events".occasion_id = "occasions".id
    JOIN "categories" ON "events".category_id = "categories".id
    WHERE "user_id" = $1
    ORDER BY "date";`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      console.log('received recent event:', result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in recent event', error);
      res.sendStatus(500);
    });
});

// route for getting one person's event (INCOMPLETE)
router.get('/recent', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('in get recent event');
    const queryText = `SELECT "date", "persons".*, "occasion", "category" FROM "events"
    JOIN "persons" ON "events".person_id = "persons".id
    JOIN "occasions" ON "events".occasion_id = "occasions".id
    JOIN "categories" ON "events".category_id = "categories".id
    WHERE "user_id" = $1 AND "persons".id = $2;`;
    pool
      .query(queryText, [req.user.id, req.params.id])
      .then((result) => {
        console.log('received recent event:', result.rows);
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error in recent event', error);
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
