import { Route, Routes } from "react-router";

import { TechLayout } from "../components/layouts/TechLayout";

export function TechRoutes() {
    return (
        <Routes>
            <Route path="/" element={<TechLayout />} />
        </Routes>
    );
}
