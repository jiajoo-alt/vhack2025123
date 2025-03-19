import React, { useState } from 'react';
import supabase from '../../../services/supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        const walletAddress = localStorage.getItem('walletAddress');
        if (!walletAddress) {
            alert("Wallet address not found. Please connect your wallet.");
            return;
        }

        if (!role) {
            alert("Please select a role.");
            return;
        }

        const { error } = await supabase
            .from('users')
            .insert({ wallet_address: walletAddress, role });

        if (error) {
            console.error('Error registering:', error.message);
            alert("Failed to register. Please try again.");
        } else {
            alert("Registration successful!");
            navigate(`/${role}`); // Redirect to their assigned role page
        }
    };

    return (
        <div>
            <h1>Register Your Role</h1>
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="donor">Donor</option>
                <option value="charity">Charity</option>
                <option value="vendor">Vendor</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterPage;
