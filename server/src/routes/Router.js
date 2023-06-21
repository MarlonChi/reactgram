const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

// test router
router.get("/test", (req, res) => {
  res.send("API Working!");
});

module.exports = router;
