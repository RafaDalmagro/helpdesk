import { Route, Routes } from "react-router";

import { AuthLayout } from "../components/layouts/AuthLayout";

import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
        </Routes>
    );
}
