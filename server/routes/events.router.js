const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * routes for events
 */

// route for getting all events
router.get("/", rejectUnauthenticated, (req, res) => {
  // store query string in route scope
  const queryText = `SELECT "date", "persons".*, "events".id AS "event_id", "occasion", "category" FROM "events"
  JOIN "persons" ON "events".person_id = "persons".id
  JOIN "occasions" ON "events".occasion_id = "occasions".id
  JOIN "categories" ON "events".category_id = "categories".id
  WHERE "user_id" = $1
  ORDER BY "date";`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      // sends events rows to client on successful pool query
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in get all events", error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

// GET route for single event
router.get("/:id", rejectUnauthenticated, (req, res) => {
  const idToGet = req.params.id;
  // store query string in route scope
  const queryText = `SELECT "events".*, "persons".name, "persons".relationship FROM "events"
  JOIN "persons" ON "events".person_id = "persons".id
  WHERE "events".id = $1`;
  pool
    .query(queryText, [idToGet])
    .then((result) => {
      // sends event rows to client on successful pool query
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

// DELETE route to remove event from database
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // store query string in route scope
  const queryText = `DELETE FROM "events" WHERE id=$1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      // sends response 200 'OK' on successful pool query
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error("ERROR in DELETE", error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
}); // end DELETE for event

// PUT route to UPDATE person address in persons database then
router.put("/", rejectUnauthenticated, (req, res) => {
  const idToUpdate = req.body.personId;
  // store query string in route scope
  const editAddressQuery = `
      UPDATE "persons"
      SET "address" = $1
      WHERE id = $2`;
  pool.query(editAddressQuery, [
    req.body.person.address,
    idToUpdate,
  ])
  .then(() => {
    // store query string in route scope
    const eventsQuery = `
      UPDATE "events"
      SET ("inscription", "ship_to_me") = ($1, $2)
      WHERE id = $3;`;
    pool.query(eventsQuery, [
        req.body.event.inscription,
        req.body.event.ship_to_me,
        req.body.eventId,
    ])
    .then((result) => {
      console.log('Updated:', result.rows);
      // sends response 200 'OK' on successful pool query
      res.sendStatus(200)
    })
    .catch((error) => {
      console.error('Error in UPDATE event and address', error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
  })
  .catch((error) => {
    console.error('Error in UPDATE address', error);
    // sends response 500 'Internal Server Error' on pool query error
    res.sendStatus(500);
  });
});

module.exports = router;
