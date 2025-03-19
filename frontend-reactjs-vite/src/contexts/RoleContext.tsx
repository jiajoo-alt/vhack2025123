import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthCheck } from '../hooks/useAuthCheck';

interface RoleContextType {
    userRole: string | null;
    isLoading: boolean;
    clearRole: () => void;
    refetchRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userRole, isLoading, refetchRole } = useAuthCheck();
    const [role, setRole] = useState<string | null>(userRole);

    // Clear role when wallet disconnects
    const clearRole = () => {
        setRole(null);
        localStorage.removeItem('userRole');
    };

    // Refetch role if `userRole` becomes null after Supabase finished checking
    useEffect(() => {
        if (!isLoading && !userRole) {
            console.log("Role is null after Supabase finished - Refetching...");
            refetchRole();
        } else if (userRole) {
            setRole(userRole);
            localStorage.setItem('userRole', userRole);
            console.log("Role set in context:", userRole);
        }
    }, [userRole, isLoading]);

    return (
        <RoleContext.Provider value={{ userRole: role, isLoading, clearRole, refetchRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
};
