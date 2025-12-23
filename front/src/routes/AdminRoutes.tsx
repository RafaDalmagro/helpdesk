import { Route, Routes } from "react-router";

import { AdminLayout } from "../components/layouts/AdminLayout";

export function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />} />
        </Routes>
    );
}
