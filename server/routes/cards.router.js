const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware.js");

// GET cards if authenticated - THIS IS NOT COMPLETE
router.get("/", rejectUnauthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    const query = `
      SELECT * FROM "cards"
      `;
    pool
      .query(query)
      .then((result) => {
        res.send(result.rows); // send it bud
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
