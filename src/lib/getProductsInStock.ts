// lib/getProductsInStock.ts
import { wixClientServer } from "@/lib/wixClientServer";

export const getProductsInStock = async () => {
  const wixClient = await wixClientServer();
  const response = await wixClient.products.queryProducts().find();

  // You can modify the logic here if you want to count only products with stock > 0
  const totalInStock = response.items.length;
  return totalInStock;
};
