const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * routes for categories
 */

// route for getting all categories
router.get("/", (req, res) => {
  // store query string in route scope
  const queryText = `SELECT * FROM "categories" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      // sends categories rows to client on successful pool query
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("error in get all categories", error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

// route for posting new category
router.post("/", rejectUnauthenticated, (req, res) => {
  // auth check if user is admin
  if (req.user.isadmin) {
    // store query string in route scope
    const queryText = `INSERT INTO "categories" ("category")
    VALUES ($1);`;
    pool
      .query(queryText, [req.body.category])
      .then((result) => {
        // sends response 200 'OK' on successful pool query
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("error in update categories", error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    console.log("not admin");
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

// route for updating category
router.put("/:id", rejectUnauthenticated, (req, res) => {
  // auth check if user is admin
  if (req.user.isadmin) {
    // store query string in route scope
    const queryText = `UPDATE "categories"
    SET "category" = $2
    WHERE "id" = $1;`;
    pool
      .query(queryText, [req.params.id, req.body.category])
      .then((result) => {
        // sends response 200 'OK' on successful pool query
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("error in update category", error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    console.log("not admin");
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

// route for deleting category
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // auth check if user is admin
  if (req.user.isadmin) {
    // store query string in route scope
    const queryText = `DELETE FROM "categories"
    WHERE "categories".id = ($1);`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        // sends response 200 'OK' on successful pool query
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("error in delete category", error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    console.log("not admin");
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

module.exports = router;
