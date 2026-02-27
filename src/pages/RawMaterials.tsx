import { useEffect, useState } from "react";
import { RawMaterialsForm } from "../components/RawMaterialsForm";
import type { RawMaterial } from "../types/RawMaterial";
import { getRawMaterials, getRawMaterialById, updateRawMaterial, deleteRawMaterial } from "../services/rawMaterialService";
import { Pencil, Trash2 } from "lucide-react";

export default function RawMaterials() {
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedRawMaterial, setSelectedRawMaterial] = useState<RawMaterial | null>(null);

    useEffect(() => {
        fetchRawMaterials();
    }, []);

    const fetchRawMaterials = async () => {
        try {
            const data = await getRawMaterials();
            setRawMaterials(data);
        } catch (err) {
            setError("Error on loading raw materials. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const rawMaterial = await getRawMaterialById(id);
            setSelectedRawMaterial(rawMaterial);
            setShowForm(true);
        } catch (err) {
            alert("Error loading raw material.");
        }
    };

    const handleFinishForm = () => {
        setShowForm(false);
        setSelectedRawMaterial(null); 
        fetchRawMaterials(); 
    };


    const handleRemove = async (item: RawMaterial, index: number) => {
        if (item.rawMaterialId) {
            await deleteRawMaterial(item.rawMaterialId);
        }

        setRawMaterials(rawMaterials.filter((_, i) => i !== index));
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
                            {selectedRawMaterial ? "Edit Raw Material" : "Create New Raw Material"}
                        </h2>
                        <button
                            onClick={() => {
                                setShowForm(!showForm);
                                if (showForm) setSelectedRawMaterial(null);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                            {showForm ? "Close" : "New"}
                        </button>
                    </div>
                    <RawMaterialsForm
                        rawMaterialToEdit={selectedRawMaterial}
                        onFinish={handleFinishForm}
                    />
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Raw Materials</h2>

                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            {showForm ? "Close" : "New"}
                        </button>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="min-w-full text-center">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-center">Code</th>
                                    <th className="px-4 py-3 text-center">Name</th>
                                    <th className="px-4 py-3 text-center">Stock Quantity</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rawMaterials.map((rawMaterial) => (
                                    <tr
                                        key={rawMaterial.code}
                                        className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{rawMaterial.code}</td>
                                        <td className="px-4 py-3">{rawMaterial.name}</td>
                                        <td className="px-4 py-3 font-medium">
                                            {rawMaterial.stockQuantity}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleEdit(rawMaterial.rawMaterialId!)}
                                                className="text-yellow-600 pr-3">
                                                <Pencil className="w-5 h-5" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleRemove(rawMaterial, rawMaterials.indexOf(rawMaterial))}
                                                className="text-red-600">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {rawMaterials.length === 0 && (
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