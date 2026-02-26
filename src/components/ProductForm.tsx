import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { postProduct } from "../services/productService";
import { getRawMaterials } from "../services/rawMaterialService";
import type { RawMaterial } from "../types/RawMaterial";
import { postProductRawMaterials } from "../services/productRawMaterialService";
import { Trash2 } from "lucide-react";

export function ProductForm() { 
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [productRawMaterials, setProductRawMaterials] = useState<ProductRawMaterialInput[]>([]);
  const [selectedProductRawMaterialId, setSelectedProductRawMaterialId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [formData, setFormData] = useState<Product>({
    code: "",
    name: "",
    price: 0,
  });

  type ProductRawMaterialInput = {
    rawMaterialId: number;
    requiredQuantity: number;
  };


  useEffect(() => {
    fetchRawMaterials();
  }, []);

  const fetchRawMaterials = async () => {
    try {
      const data = await getRawMaterials();
      setRawMaterials(data);
    } catch (err) {
      alert("No Raw Materials Created. Create at least one to continue.")
    }
  };

  const handleAddMaterial = () => {
    if (!selectedProductRawMaterialId || quantity <= 0) return;

    setProductRawMaterials([
      ...productRawMaterials,
      {
        rawMaterialId: selectedProductRawMaterialId,
        requiredQuantity: quantity
      }
    ]);

    setSelectedProductRawMaterialId(null);
    setQuantity(1);
  };

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
      const productCreated = await postProduct(formData);

      alert("Product created successfully.");

      setFormData({
        code: "",
        name: "",
        price: 0,
      });

      for (const material of productRawMaterials) {
        await postProductRawMaterials({
          productId: productCreated.productId,
          rawMaterialId: material.rawMaterialId,
          requiredQuantity: material.requiredQuantity
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error creating product" + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  rounded-lg w-full">

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <label htmlFor="Code" className="mb-1 text-sm font-semibold text-gray-700">
            Code
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="Name" className="mb-1 text-sm font-semibold text-gray-700">
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
          <label htmlFor="price" className="mb-1 text-sm font-semibold text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border rounded w-full"
            required />
        </div>

        <div className="grid grid-cols-3 gap-4 items-end">
          <div className="flex flex-col">
            <label htmlFor="Raw Material" className="mb-1 text-sm font-semibold text-gray-700">
              Raw Material
            </label>
            <select
              className="p-2 border rounded"
              value={selectedProductRawMaterialId ?? ""}
              onChange={(e) => setSelectedProductRawMaterialId(Number(e.target.value))}
            >
              <option value="">Select...</option>
              {rawMaterials.map((rm) => (
                <option key={rm.rawMaterialId} value={rm.rawMaterialId}>
                  {rm.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="Required Quantity" className="mb-1 text-sm font-semibold text-gray-700">
              Required Quantity
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="p-2 border rounded"
            />
          </div>

          <button
            type="button"
            onClick={handleAddMaterial}
            className="bg-gray-700 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>

      {productRawMaterials.length > 0 && (
        <table className="min-w-full mt-4 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Material</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {productRawMaterials.map((item, index) => {
              const material = rawMaterials.find(
                (rm) => rm.rawMaterialId === item.rawMaterialId
              );

              return (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{material?.name}</td>
                  <td className="px-4 py-2">{item.requiredQuantity}</td>
                  <td className="px-4 py-2 text-right"> 
                    <button
                      type="button"
                      onClick={() =>
                        setProductRawMaterials(productRawMaterials.filter((_, i) => i !== index))
                      }
                      className="text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className="flex justify-end pt-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save
        </button>
      </div>
    </form>
  );
} 