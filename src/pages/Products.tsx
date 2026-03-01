import { useEffect, useState } from "react";
import { getProductByCode, getProducts, deleteProduct } from "../services/productService";
import type { Product } from "../types/Product";
import { ProductForm } from "../components/ProductForm";
import { Pencil, Trash2 } from "lucide-react";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError("Error on loading products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (code: string) => {
        try {
            const product = await getProductByCode(code);
            setSelectedProduct(product);
            setShowForm(true);
        } catch (err) {
            alert("Error loading product.");
        }
    };

    const handleRemove = async (item: Product, index: number) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${item.name}?`);
        if (!confirmDelete) return;

        try {
            if (item.productId) {
                await deleteProduct(item.productId);
            }
            setProducts(products.filter((_, i) => i !== index));

        } catch (err: any) {
            alert(`Cannot delete ${item.name}. It is currently associated with one or more raw materials.`);
            console.error("Error deleting product:", err);
        }
    };

    if (loading) {
        return <p className="text-gray-600 text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            {showForm ? (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2>
                            {selectedProduct ? "Edit Product" : "Create New Product"}
                        </h2>
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            {showForm ? "Close" : "New"}
                        </button>
                    </div>
                    <ProductForm
                        productToEdit={selectedProduct}
                        onFinish={() => {
                            setShowForm(false);
                            setSelectedProduct(null);
                            fetchProducts();
                        }}
                    />
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Products</h2>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            {showForm ? "Close" : "New"}
                        </button>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-center">Code</th>
                                    <th className="px-4 py-3 text-center">Name</th>
                                    <th className="px-4 py-3 text-center">Price</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.code} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 text-center">{product.code}</td>
                                        <td className="px-4 py-3 text-center">{product.name}</td>
                                        <td className="px-4 py-3 font-medium text-green-600 text-center">
                                            ${product.price}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleEdit(product.code)}
                                                className="text-yellow-600 pr-3">
                                                <Pencil className="w-5 h-5" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleRemove(product, products.indexOf(product))}
                                                className="text-red-600">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
                                            No data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}