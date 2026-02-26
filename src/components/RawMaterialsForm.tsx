import { useState } from "react";
import type { RawMaterial } from "../types/RawMaterial"; 
import { postRawMaterial } from "../services/rawMaterialService";

export function RawMaterialsForm() {
  const [formData, setFormData] = useState<RawMaterial>({
    code: "",
    name: "",
    stockQuantity: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "stockQuantity" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postRawMaterial(formData);

      alert("Raw Material created successfully.");

      setFormData({
        code: "",
        name: "",
        stockQuantity: 0,
      });
    } catch (error) {
      console.error(error);
      alert("Error creating Raw Material");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg w-full">

      <div className="grid grid-cols-3 gap-4 mb-4">
        <input 
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required />

        <input
          type="number"
          name="stockQuantity"
          placeholder="Stock Quantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </div>
    </form>
  );
}