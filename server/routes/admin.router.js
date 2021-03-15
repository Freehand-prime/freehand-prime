const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

/**
 * adminCards routes for cards
 */

router.post('/card', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.put('/card/', rejectUnauthenticated, (req, res) => {
    // POST route code here
});

router.delete('/card/:id', rejectUnauthenticated, (req, res) => {
    // POST route code here
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