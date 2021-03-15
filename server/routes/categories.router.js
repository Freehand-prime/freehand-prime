const express = require('express');
const pool = require('../modules/pool');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

// route for getting all categories
router.get('/', (req, res) => {
  console.log('in get all categories');
  const queryText = `SELECT * FROM "categories" ORDER BY "id" ASC;;`;
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

// route for posting new category
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('in post category, received', req.body);
  console.log('user is admin', req.user.isadmin);
  if (req.user.isadmin) {
    const queryText = `INSERT INTO "categories" ("category")
    VALUES ($1);`;
    pool
      .query(queryText, [req.body.category])
      .then((result) => {
        console.log('updated categories');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in update categories', error);
        res.sendStatus(500);
      });
  } else {
    console.log('not admin');
    res.sendStatus(403);
  }
});

// route for updating category
router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in update category', req.params.id, req.body.category);
  if (req.user.isadmin) {
    const queryText = `UPDATE "categories"
    SET "category" = $2
    WHERE "id" = $1;`;
    pool
      .query(queryText, [req.params.id, req.body.category])
      .then((result) => {
        console.log('updated category');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in update category', error);
        res.sendStatus(500);
      });
  } else {
    console.log('not admin');
    res.sendStatus(403);
  }
});

// route for deleting category
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('in delete category', req.params.id);
  if (req.user.isadmin) {
    const queryText = `DELETE FROM "categories"
    WHERE "categories".id = ($1);`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        console.log('deleted category');
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in delete category', error);
        res.sendStatus(500);
      });
  } else {
    console.log('not admin');
    res.sendStatus(403);
  }
});

// MAKE SURE TO ADD ADMIN AUTH FOR POST, DELETE, UPDATE


module.exports = router;
