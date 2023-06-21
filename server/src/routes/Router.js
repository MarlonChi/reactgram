const express = require("express");
const router = express();

// test router
router.get("/test", (req, res) => {
  res.send("API Working!");
});

module.exports = router;
