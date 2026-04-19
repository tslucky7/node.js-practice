const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("products router accessed");
  next();
});

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Book" },
    { id: 2, name: "Pen" }
  ]);
});

router.get("/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "sample product"
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "product created",
    product: req.body
  });
});

module.exports = router;
