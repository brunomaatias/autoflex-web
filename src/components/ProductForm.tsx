import { useState } from "react";
import type { Product } from "../types/Product";
import { postProduct } from "../services/productService";

export function ProductForm() {
  const [formData, setFormData] = useState<Product>({
    code: "",
    name: "",
    price: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postProduct(formData);

      alert("Product created successfully.");

      setFormData({
        code: "",
        name: "",
        price: 0,
      });
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  rounded-lg w-full">

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
          name="price"
          placeholder="Price"
          value={formData.price}
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