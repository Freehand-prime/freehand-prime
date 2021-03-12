const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting user's persons
router.get('/', (req, res) => {
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

// POST route for adding a new person and event to the database
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('received person and event', req.body);

  const insertPersonQuery = `
    INSERT INTO "persons" ("user_id", "name", "relationship")
    VALUES ($1, $2, $3)
    RETURNING "id";`;

  pool
    .query(insertPersonQuery, [
      req.user.id,
      req.body.person.name,
      req.body.person.relationship,
    ])
    .then((result) => {
      const newPersonId = result.rows[0].id;

      console.log('New Person Entry:', result.rows);
      console.log('New Person ID:', newPersonId);

      const insertEventQuery = `
      INSERT INTO "events" ("person_id", "category_id", "occasion_id", "date")
      VALUES ($1, $2, $3, $4);`;

      pool
        .query(insertEventQuery, [
          newPersonId,
          req.body.newEvent.category,
          req.body.newEvent.occasion,
          req.body.newEvent.date,
        ])
        .then((result) => {
          console.log('new event entry:', result.rows);
          res.sendStatus(201);
        })
        .catch((error) => {
          console.error('Error in posting event', error);
          res.sendStatus(500);
        });
      // res.sendStatus(201);
    })
    .catch((error) => {
      console.error('Error in posting person at the Router', error);
      res.sendStatus(500);
    });
}); //end POST for persons

module.exports = router;
