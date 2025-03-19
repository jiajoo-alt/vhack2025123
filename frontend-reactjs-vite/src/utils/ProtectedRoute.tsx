import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';

interface ProtectedRouteProps {
    allowedRoles?: string[];      // ✅ Supports multiple roles for flexible access
    isAllowed?: boolean;         // For flexible permission control
    redirectPath: string;        // Path to redirect unauthorized users
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    allowedRoles,
    isAllowed = true,
    redirectPath
}) => {
    const { userRole, isLoading, roleChecked } = useRole();

    // Prevent navigation until role check completes
    if (!roleChecked || isLoading) {
        return <div>Loading...</div>;
    }

    // Redirect New Users to Register Page
    if (roleChecked && !userRole) {
        console.log("Redirecting new user to /register");
        return <Navigate to="/register" replace />;
    }

    // Role-Based Access Control
    if (allowedRoles && !allowedRoles.includes(userRole || '')) {
        console.log("Unauthorized access - Redirecting to", redirectPath);
        return <Navigate to={redirectPath} replace />;
    }

    // Permission-Based Control (e.g., Admin-specific pages)
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
