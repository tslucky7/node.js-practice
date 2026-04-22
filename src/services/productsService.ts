import {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from '../types/product';

let products: Product[] = [
  { id: 1, name: 'Keyboard', price: 5000 },
  { id: 2, name: 'Mouse', price: 3000 },
];

export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};

export const createProduct = async ({
  name,
  price,
}: CreateProductInput): Promise<Product> => {
  const newProduct: Product = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (
  id: number,
  input: UpdateProductInput,
): Promise<Product | null> => {
  const targetProduct = products.find((product) => product.id === id);

  if (!targetProduct) {
    return null;
  }

  targetProduct.name = input.name ?? targetProduct.name;
  targetProduct.price = input.price ?? targetProduct.price;
  return targetProduct;
};

export const deleteProduct = async (id: number): Promise<Product | null> => {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return null;
  }

  const deletedProduct = products.splice(index, 1)[0];
  return deletedProduct ?? null;
};
