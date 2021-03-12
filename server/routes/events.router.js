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

// GET route for single event
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const idToGet = req.params.id;
  const queryText = `SELECT * FROM "events"
      WHERE "events".id = $1;`;
  pool
    .query(queryText, [idToGet])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// POST route for adding event details
router.post('/', (req, res) => {
  console.log(req.body);
  const insertEventQuery = `
  INSERT INTO "events" ("category_id", "occasion_id", "date")
  VALUES ($1, $2, $3);`;

  pool
  .query(insertEventQuery, [req.body.category_id,
                            req.body.occasion_id,
                            req.body.date])
  .then( result => {
    console.log('New Event Entry:', result.rows)
    res.sendStatus(201);
  })
  .catch( error => {
    console.error('Error in posting event at the Router', error);
    res.sendStatus(500);
  })
}); // end POST for event

// DELETE route to remove event from database
router.delete('/:id', (req, res) => {
  const queryText = `DELETE FROM "events" WHERE id=$1;`;
  pool
  .query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200)
  })
  .catch( error => {
    console.error('ERROR in DELETE', error);
    res.sendStatus(500);
  })
}); // end DELETE for event

// PUT route to UPDATE person name in persons database then UPDATE event details in events database
// router.put('/:id', (req, res) => {
//   // Update this entry
//   try {
//     //const idToUpdate = req.params.id;
//     const personsQuery = `
//       UPDATE "persons"
//       SET "name" = $1
//       WHERE id = $2;`;

//     const personsResult = await pool.query(personsQuery, [req.body.name]);

//     const eventsQuery = `
//       UPDATE "events"
//       SET ("occasion_id", "category_id", "date") = ($1, $2, $3)
//       WHERE id = $4;`;
    
//     await req.body.events.forEach(async (event) => {
//       const eventsResult = await pool.query(eventsQuery, [event.occasion_id,
//                                                           event.category_id,
//                                                           event.date])
//     })
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

module.exports = router;
