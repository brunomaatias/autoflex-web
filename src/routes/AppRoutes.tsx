import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import RawMaterials from "../pages/RawMaterials";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/raw-materials" element={<RawMaterials />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}