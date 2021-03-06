const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * routes for occasions
 */

// route for getting all occasions
router.get("/", (req, res) => {
  // store query string in route scope
  const queryText = `SELECT * FROM "occasions" ORDER BY "id" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      // sends occasions rows to client on successful pool query
      res.send(result.rows);
    })
    .catch((error) => {
      console.error("error in get all occasions", error);
      // sends response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

// route for posting new occasion
router.post("/", rejectUnauthenticated, (req, res) => {
  // auth check if user is admin
  if (req.user.isadmin) {
    // store query string in route scope
    const queryText = `INSERT INTO "occasions" ("occasion")
    VALUES ($1);`;
    pool
      .query(queryText, [req.body.occasion])
      .then((result) => {
        // sends response 200 'OK' on successful pool query
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("error in update occasion", error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    console.log("not admin");
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

// route for updating occasion
router.put("/:id", rejectUnauthenticated, (req, res) => {
  // auth check if user is admin
  if (req.user.isadmin) {
    // store query string in route scope
    const queryText = `UPDATE "occasions"
    SET "occasion" = $2
    WHERE "id" = $1;`;
    pool
      .query(queryText, [req.params.id, req.body.occasion])
      .then((result) => {
        // sends response 200 'OK' on successful pool query
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("error in update occasion", error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    console.log("not admin");
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

// route for deleting occasion
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // auth check if user is admin
  if (req.user.isadmin) {
    // store query string in route scope
    const queryText = `DELETE FROM "occasions"
    WHERE "occasions".id = ($1);`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        // sends response 200 'OK' on successful pool query
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("error in delete occasion", error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    console.log("not admin");
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

// MAKE SURE TO ADD ADMIN AUTH FOR POST, DELETE, UPDATE

module.exports = router;
