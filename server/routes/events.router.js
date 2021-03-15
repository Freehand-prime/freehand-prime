const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting all events
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('in get all events');
  const queryText = `SELECT "date", "persons".*, "events".id AS "event_id", "occasion", "category" FROM "events"
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

// GET route for single event
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const idToGet = req.params.id;
  const queryText = `SELECT "events".*, "persons".name, "persons".relationship FROM "events"
  JOIN "persons" ON "events".person_id = "persons".id
  WHERE "events".id = $1`;
  pool
    .query(queryText, [idToGet])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// DELETE route to remove event from database
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "events" WHERE id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('ERROR in DELETE', error);
      res.sendStatus(500);
    });
}); // end DELETE for event

// PUT route to UPDATE person address in persons database then 
// UPDATE inscription, is_shipped, ship_to_me, in events database

router.put('/', rejectUnauthenticated, async (req, res) => {
  // Update this entry
  console.log('received', req.body)
  try {
    const idToUpdate = req.body.personId;

    const editAddressQuery = `
      UPDATE "persons"
      SET ("address") = ($1)
      WHERE id = $2`;

      const addressResult = await pool.query(editAddressQuery, [
      req.body.person.address,
      idToUpdate,
    ]);

    const eventsQuery = `
      UPDATE "events"
      SET ("inscription", "ship_to_me") = ($1, $2)
      WHERE id = $3;`;

    const eventResult = await pool.query(eventsQuery, [
      req.body.event.inscription,
      req.body.event.ship_to_me,
      req.body.eventId,
    ]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

module.exports = router;
