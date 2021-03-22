const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * adminCards routes for cards
 */

router.get("/", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    // store query string in route scope
    const query = `
        SELECT "cards".*, "categories".category, "occasions".occasion FROM "cards"
        JOIN "categories" ON "cards".category_id = "categories".id
        JOIN "occasions" ON "cards".occasion_id = "occasions".id
        ORDER BY "id" ASC;`;
    pool
      .query(query)
      .then((result) => {
        // sends cards rows to client on successful pool query
        res.send(result.rows);
      })
      .catch((error) => {
        console.error(error);
        // sends response 500 'Internal Server Error' on pool query error
        res.sendStatus(500);
      });
  } else {
    // send response 403 'Forbidden' if user is not authenticated
    res.sendStatus(403);
  }
});

router.post("/card", rejectUnauthenticated, (req, res) => {
  //debug log
  console.log(req.body);
  //store data on body in route scope
  const newCardData = req.body;
  //store query string in route scope
  const cardToAddQuery = `
        INSERT INTO "cards" (
        "occasion_id", 
        "category_id", 
        "image_front", 
        "image_inside",  
        "artist", 
        "details") VALUES ($1, $2, $3, $4, $5, $6);
        `;
  pool
    .query(cardToAddQuery, [
      newCardData.occasion_id,
      newCardData.category_id,
      newCardData.image_front,
      newCardData.image_inside,
      newCardData.artist,
      newCardData.details,
    ])
    .then(() => {
      //send response 201 'Created' on pool query success
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      //send response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

router.put("/card", rejectUnauthenticated, (req, res) => {
  //store data on body in route scope
  const updateCardData = req.body;
  //store query string in route scope
  const cardToUpdateQuery = `
        UPDATE "cards"
        SET ("occasion_id", 
        "category_id", 
        "image_front", 
        "image_inside",  
        "artist", 
        "details") = ($1, $2, $3, $4, $5, $6)
        WHERE id = $7;
        `;
  pool
    .query(cardToUpdateQuery, [
      updateCardData.occasion_id,
      updateCardData.category_id,
      updateCardData.image_front,
      updateCardData.image_inside,
      updateCardData.artist,
      updateCardData.details,
      updateCardData.id,
    ])
    .then(() => {
      //send response 200 'OK' on pool query success
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      //send response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

router.delete("/card/:id", rejectUnauthenticated, (req, res) => {
  //store ID in route scope
  const cardToDeleteID = req.params.id;
  //store query string in route scope
  const cardToDeleteQuery = `
        DELETE FROM "cards"
        WHERE id=$1;
        `;
  pool
    .query(cardToDeleteQuery, [cardToDeleteID])
    .then(() => {
      //send response 200 'OK' on pool query success
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      //send response 500 'Internal Server Error' on pool query error
      res.sendStatus(500);
    });
});

module.exports = router;
