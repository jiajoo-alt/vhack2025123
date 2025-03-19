import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    requiredRole?: string;       // For Role-Based Control
    isAllowed?: boolean;         // For Flexible Permission Control
    redirectPath: string;        // Path to redirect unauthorized users
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredRole,
    isAllowed = true,            // Default to true for flexibility
    redirectPath
}) => {
    const userRole = localStorage.getItem('userRole');

    // Role-Based Check
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to={redirectPath} replace />;
    }

    // Permission-Based Check (e.g., admin-only actions)
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
