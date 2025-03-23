import { useEffect, useState, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import supabase from '../services/supabase/supabaseClient';

export const useAuthCheck = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roleChecked, setRoleChecked] = useState<boolean>(false);  // ✅ New state to prevent infinite refetch

    const activeAccount = useActiveAccount();

    const refetchRole = useCallback(async () => {
        if (!activeAccount?.address) {
            setUserRole(null);
            setIsLoading(false);
            setRoleChecked(true);  // ✅ Mark as checked, even if no role found
            return;
        }
        
        setIsLoading(true);

        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('wallet_address', activeAccount.address)
            .single();

        if (error || !data?.role) {
            console.warn("No role found - Assuming New User");
            setUserRole(null);
        } else {
            console.log("Role refetched:", data.role);
            setUserRole(data.role);
        }

        setIsLoading(false);
        setRoleChecked(true);  // ✅ Mark as checked when the refetch completes
    }, [activeAccount]);

    useEffect(() => {
        const checkUserRole = async () => {
            if (!activeAccount?.address) {
                setIsLoading(false);
                setUserRole(null);
                setRoleChecked(true);  // ✅ Mark as checked if no address found
                return;
            }

            setIsLoading(true);

            const { data, error } = await supabase
                .from('users')
                .select('role')
                .eq('wallet_address', activeAccount.address)
                .single();

            if (data?.role) {
                console.log("Role found:", data.role);
                setUserRole(data.role);
            } else {
                console.warn("No role found - Assuming New User");
                setUserRole(null);
            }

            setIsLoading(false);
            setRoleChecked(true);  // ✅ Mark as checked
        };

        checkUserRole();
    }, [activeAccount]);

    return { userRole, isLoading, refetchRole, roleChecked };
};
