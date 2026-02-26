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