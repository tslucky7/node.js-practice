"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const product_1 = __importDefault(require("./routes/product"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
app.use("/users", users_1.default);
app.use("/products", product_1.default);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "サーバーエラーが発生しました"
    });
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
