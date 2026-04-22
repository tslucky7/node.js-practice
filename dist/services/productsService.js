"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getAllProducts = void 0;
let products = [
    { id: 1, name: 'Keyboard', price: 5000 },
    { id: 2, name: 'Mouse', price: 3000 },
];
const getAllProducts = async () => {
    return products;
};
exports.getAllProducts = getAllProducts;
const createProduct = async ({ name, price, }) => {
    const newProduct = {
        id: products.length + 1,
        name,
        price,
    };
    products.push(newProduct);
    return newProduct;
};
exports.createProduct = createProduct;
const updateProduct = async (id, input) => {
    const targetProduct = products.find((product) => product.id === id);
    if (!targetProduct) {
        return null;
    }
    targetProduct.name = input.name ?? targetProduct.name;
    targetProduct.price = input.price ?? targetProduct.price;
    return targetProduct;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        return null;
    }
    const deletedProduct = products.splice(index, 1)[0];
    return deletedProduct ?? null;
};
exports.deleteProduct = deleteProduct;
