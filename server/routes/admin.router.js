const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * adminCards routes for cards
 */

//TODO: change rejectUnauthenticated middleware to handle rejectAdminUnauthenticated

router.post('/card', rejectUnauthenticated, (req, res) => {
    // POST route code here
        //store data on body in route scope
    const newCardData = req.body;
        //store query string in route scope
    const cardToAddQuery = `

        `;
    try {

    } catch(error) {
        console.error(error);
            //send response 500 'Internal Server Error' on pool query error 
        res.sendStatus(500);
    }
});

router.put('/card/', rejectUnauthenticated, (req, res) => {
    // POST route code here
        //store data on body in route scope
    const updateCardData = req.body;
        //store query string in route scope
    const cardToUpdateQuery = `
    
        `;
    try {

    } catch(error) {
        console.error(error);
            //send response 500 'Internal Server Error' on pool query error 
        res.sendStatus(500);
    }
});

router.delete('/card/:id', rejectUnauthenticated, (req, res) => {
    // POST route code here
        //store ID in route scope
    const cardToDeleteID = req.params.id;
        //store query string in route scope
    const cardToDeleteQuery = `
        DELETE FROM "cards"
        WHERE id=$1;
        `;
    pool
        .query(cardToDeleteQuery, [
        cardToDeleteID,
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

router.put('/occasion/', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.delete('/occasion/:id', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

/**
 * adminOccasions routes for categories
 */

router.post('/category', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.put('/category/', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.delete('/category/:id', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

module.exports = router;