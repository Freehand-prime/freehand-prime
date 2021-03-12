const express = require('express');
const pool = require('../modules/pool');
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

// POST route for adding a new person to the database
router.post('/', (req, res) => {
  console.log(req.body)
  const insertPersonQuery = `
    INSERT INTO "persons" ("user_id", "name", "relationship", "address")
    VALUES ($1, $2, $3, $4);`;

  pool
  .query(insertPersonQuery, [req.body.user_id, 
                                req.body.name, 
                                req.body.relationship,
                                req.body.address])
  .then( result => {
    console.log('New Person Entry:', result.rows);
    res.sendStatus(201);
  })
  .catch( error => {
    console.error('Error in posting person at the Router', error);
    res.sendStatus(500);
  })
}); //end POST for persons

module.exports = router;
