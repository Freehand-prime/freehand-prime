const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting all occasions
router.get('/', (req, res) => {
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

// route for posting new occasion
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in post occasion, received', req.body);
  console.log('user is admin', req.user.isadmin);
  if (req.user.isadmin) {
    const queryText = `INSERT INTO "occasions" ("occasion")
    VALUES ($1);`;
    pool
      .query(queryText, [req.body.occasion])
      .then((result) => {
        console.log('updated occasions');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in update occasion', error);
        res.sendStatus(500);
      });
  } else {
    console.log('not admin');
    res.sendStatus(403);
  }
});

// route for deleting occasion
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete occasion', req.params.id);
  // const queryText = req.user.admin
  //   ? `DELETE FROM "brands" WHERE "brands".id = $1;`
  //   : null;
  // pool
  //   .query(queryText, [req.params.id])
  //   .then((result) => {
  //     console.log('deleted brand');
  //     res.sendStatus(200);
  //   })
  //   .catch((error) => {
  //     console.log('error in delete brand', error);
  //     res.sendStatus(500);
  //   });
});

// MAKE SURE TO ADD ADMIN AUTH FOR POST, DELETE, UPDATE

module.exports = router;
