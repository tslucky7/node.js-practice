import {
  Product,
  CreateProductInput,
  UpdateProductInput,
} from '../types/product';

let products: Product[] = [
  { id: 1, name: 'Keyboard', price: 5000 },
  { id: 2, name: 'Mouse', price: 3000 },
];

/**
 * 商品一覧を取得する
 * @returns 商品一覧
 */
export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};

/**
 * 商品を取得する
 * @param id 商品ID
 * @returns 商品
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  return products.find((product) => product.id === id) ?? null;
};

/**
 * 商品を作成する
 * @param name 商品名
 * @param price 商品価格
 * @returns 商品
 */
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

/**
 * 商品を更新する
 * @param id 商品ID
 * @param input 商品情報
 * @returns 商品
 */
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

/**
 * 商品を削除する
 * @param id 商品ID
 * @returns 商品
 */
export const deleteProduct = async (id: number): Promise<Product | null> => {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return null;
  }

  const deletedProduct = products.splice(index, 1)[0];
  return deletedProduct ?? null;
};
