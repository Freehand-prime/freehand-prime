const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

//TODO: change rejectUnauthenticated middleware to handle rejectAdminUnauthenticated

/**
 * adminCards routes for cards
 */

router.post('/card', rejectUnauthenticated, (req, res) => {
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
            newCardData.details
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

router.put('/card', rejectUnauthenticated, (req, res) => {
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
            updateCardData.id
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

router.delete('/card/:id', rejectUnauthenticated, (req, res) => {
        //store ID in route scope
    const cardToDeleteID = req.params.id;
        //store query string in route scope
    const cardToDeleteQuery = `
        DELETE FROM "cards"
        WHERE id=$1;
        `;
    pool
        .query(cardToDeleteQuery, [
            cardToDeleteID
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

/**
 * adminOccasions routes for occasions
 */
  
router.post('/occasion', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.put('/occasion', rejectUnauthenticated, (req, res) => {
    // PUT route code here
});

router.delete('/occasion/:id', rejectUnauthenticated, (req, res) => {
    // DELETE route code here
});

/**
 * adminOccasions routes for categories
 */

router.post('/category', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.put('/category', rejectUnauthenticated, (req, res) => {
    // PUT route code here
});

router.delete('/category/:id', rejectUnauthenticated, (req, res) => {
    // DELETE route code here
});

module.exports = router;