import { NextResponse } from "next/server";
import { getProductsInStock } from "@/lib/getProductsInStock";

export async function GET() {
  try {
    const products = await getProductsInStock();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products in stock:", error);
    return NextResponse.json([], { status: 500 });
  }
}
