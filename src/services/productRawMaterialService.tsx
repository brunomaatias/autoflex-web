import { api } from "./api";
import type { ProductRawMaterial } from "../types/ProductRawMaterial";

export const getProductRawMaterals = async (): Promise<ProductRawMaterial[]> => {
  const response = await api.get<ProductRawMaterial[]>("/product-raw-materials");
  return response.data;
};

export const postProductRawMaterials = async (product: ProductRawMaterial): Promise<ProductRawMaterial> => {
  const response = await api.post<ProductRawMaterial>("/product-raw-materials", product );
  return response.data; 
};