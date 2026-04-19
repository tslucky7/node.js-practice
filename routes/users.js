const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "TS" },
    { id: 2, name: "Alice" }
  ]);
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "sample user"
  });
});

module.exports = router;
