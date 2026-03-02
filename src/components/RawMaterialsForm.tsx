import { useState, useEffect } from "react";
import type { RawMaterial } from "../types/RawMaterial";
import { postRawMaterial, updateRawMaterial } from "../services/rawMaterialService";

type Props = {
  rawMaterialToEdit?: RawMaterial | null;
  onFinish?: () => void;
};

export function RawMaterialsForm({ rawMaterialToEdit, onFinish }: Props) {
  const isEditMode = !!rawMaterialToEdit;

  const [formData, setFormData] = useState<RawMaterial>({
    code: "",
    name: "",
    stockQuantity: 0,
  });

  useEffect(() => {
    if (rawMaterialToEdit) {
      setFormData(rawMaterialToEdit);
    } else {
      setFormData({
        code: "",
        name: "",
        stockQuantity: 0,
      });
    }
  }, [rawMaterialToEdit]);

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
      if (isEditMode) {
        await updateRawMaterial(formData);

        alert("Raw Material updated successfully.");
      } else {
        await postRawMaterial(formData);

        alert("Raw Material created successfully.");
      }

      if (onFinish) {
        onFinish();
      } else {
        setFormData({
          rawMaterialId: 0,
          code: "",
          name: "",
          stockQuantity: 0,
        });
      }

    } catch (error) {
      console.error(error);
      alert("Error saving Raw Material: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg w-full">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="code" className="mb-1 text-sm font-semibold text-gray-700">
            Code
          </label>
          <input
            readOnly
            type="text"
            name="code"
            placeholder="Generated Automatically"
            value={formData.code}
            onChange={handleChange}
            className="p-2 border rounded w-full bg-gray-50" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="stockQuantity" className="mb-1 text-sm font-semibold text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required />
        </div>
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