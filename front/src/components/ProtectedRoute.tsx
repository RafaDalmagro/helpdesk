import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: "admin" | "tech" | "client";
}

export function ProtectedRoute({
    children,
    requiredRole,
}: ProtectedRouteProps) {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex">
                <Loading />
            </div>
        );
    }

    if (!session?.userWithoutPassword?.role) {
        return null;
    }

    if (requiredRole && session.userWithoutPassword.role !== requiredRole) {
        return null;
    }

    return <>{children}</>;
}
