import { api } from "./api";
import type { Product, ProductionSuggestion } from "../types/Product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>("/products");
  return response.data;
};

export const postProduct = async (product: Product): Promise<Product> => {
  const response = await api.post<Product>("/products", product);
  return response.data;
};

export const getSuggestProductsProdution = async (): Promise<ProductionSuggestion[]> => {
  const response = await api.get<ProductionSuggestion[]>("/products/production-plan");
  return response.data;
};

export const getProductByCode = async (code: string): Promise<Product | null> => {
  try {
    const response = await api.get<Product>(`/products/${code}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateProduct = async (code: string, product: Product): Promise<Product> => {
  const response = await api.put<Product>(`/products/${code}`, product);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};