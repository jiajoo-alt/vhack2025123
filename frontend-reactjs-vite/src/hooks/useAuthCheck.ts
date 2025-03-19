import { useEffect, useState, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import supabase from '../services/supabase/supabaseClient';

export const useAuthCheck = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const activeAccount = useActiveAccount();

    // Refetch logic for role data
    const refetchRole = useCallback(async () => {
        if (!activeAccount?.address) {
            setUserRole(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);  // Ensure Supabase is still checking before updating `null`

        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('wallet_address', activeAccount.address)
            .single();

        if (data) {
            console.log("Role refetched:", data.role);
            setUserRole(data.role);
        } else {
            console.log("No role found on refetch");
            setUserRole(null);
        }

        setIsLoading(false);  // End loading state after Supabase check
    }, [activeAccount]);

    useEffect(() => {
        const checkUserRole = async () => {
            if (!activeAccount?.address) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);  // Prevent setting `null` before data retrieval

            localStorage.setItem('walletAddress', activeAccount.address);

            const { data, error } = await supabase
                .from('users')
                .select('role')
                .eq('wallet_address', activeAccount.address)
                .single();

            if (data) {
                console.log("I have found data", data);
                setUserRole(data.role);
            } else {
                console.log("No data found");
                setUserRole(null);  // Ensure role is `null` only if no data
            }

            setIsLoading(false);
        };

        checkUserRole();
    }, [activeAccount]);

    return { userRole, isLoading, refetchRole };
};
