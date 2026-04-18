const express = require("express");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Express");
});

const products = [
  { id: 1, name: "orange" },
  { id: 2, name: "apple" },
  { id: 3, name: "blue berry" }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  res.json(
    products[req.params.id]
  );
});

app.use(express.json());

app.post("/products", (req, res) => {
  const newProduct = req.body;

  res.status(201).json({
    message: "product created",
    product: newProduct
  });
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
