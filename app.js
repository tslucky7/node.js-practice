const express = require("express");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("top page");
});

app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
