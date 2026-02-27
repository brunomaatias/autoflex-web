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

export const getProductRawMateralsByIdProduct = async (productId: number): Promise<ProductRawMaterial[]> => {
  const response = await api.get<ProductRawMaterial[]>(`/product-raw-materials/product/${productId}`);
  return response.data;
};

export const deleteProductRawMaterialsById = async (productRawMaterialId: number): Promise<ProductRawMaterial> => {
  const response = await api.delete<ProductRawMaterial>(`/product-raw-materials/${productRawMaterialId}`);
  return response.data;
};

export const updateProductRawMaterials = async (productRawMaterial: ProductRawMaterial): Promise<ProductRawMaterial> => {
  const response = await api.put<ProductRawMaterial>(`/product-raw-materials/${productRawMaterial.productRawMaterialId}`, productRawMaterial);
  return response.data;
};