import { api } from "./api";
import type { RawMaterial } from "../types/RawMaterial";

export const getRawMaterials = async (): Promise<RawMaterial[]> => {
  const response = await api.get<RawMaterial[]>("/raw-materials");
  return response.data;
};

export const postRawMaterial = async (rawMaterial: RawMaterial): Promise<RawMaterial> => {
  const response = await api.post<RawMaterial>("/raw-materials", rawMaterial );
  return response.data; 
};

export const getRawMaterialById = async (id: number): Promise<RawMaterial> => {
  const response = await api.get<RawMaterial>(`/raw-materials/${id}`);
  return response.data;
};

export const updateRawMaterial = async (rawMaterial: RawMaterial): Promise<RawMaterial> => {
  const response = await api.put<RawMaterial>(`/raw-materials/${rawMaterial.rawMaterialId}`, rawMaterial);
  return response.data;
};

export const deleteRawMaterial = async (id: number): Promise<void> => {
  await api.delete(`/raw-materials/${id}`);
};