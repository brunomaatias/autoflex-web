import { useEffect, useState } from "react"; 
import type { ProductionSuggestion } from "../types/Product";
import { getSuggestProductsProdution } from "../services/productService";

export default function ProductionPlan() {
    const [productionSuggestions, setProductionSuggestions] = useState<ProductionSuggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 

    useEffect(() => {
        fetchProductionPlan();
    }, []);

    const fetchProductionPlan = async () => {
        try {
            const data = await getSuggestProductsProdution();
            setProductionSuggestions(data);
        } catch (err) {
            setError("Error on loading production plans. Please try again later." + error);
        } finally {
            setLoading(false);
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
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Production Plans</h2> 
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="min-w-full text-center">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3">Product</th>
                                    <th className="px-4 py-3">Unit Price</th> 
                                    <th className="px-4 py-3">Quantity Possible</th>
                                    <th className="px-4 py-3">Total Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productionSuggestions.map((item) => (
                                    <tr key={item.productId} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{item.productName}</td>
                                        <td className="px-4 py-3 text-green-600">${item.unitPrice}</td> 
                                        <td className="px-4 py-3">{item.quantityPossible}</td>
                                        <td className="px-4 py-3 font-semibold text-green-600">${item.totalValue}</td>
                                    </tr>
                                ))}
                                {productionSuggestions.length === 0 && (
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
        </div>
    );
}