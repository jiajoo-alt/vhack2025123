import React, { useState, useEffect } from 'react';
import supabase from '../../../services/supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useActiveAccount } from 'thirdweb/react';
import { useAuthCheck } from '../../../hooks/useAuthCheck'; // ✅ Import Role Check
import coverPicture from "../../../assets/images/register-page-picture.jpg";
import ConnectAccButton from '../../../components/Button/ConnectButton';
import './index.css';

const RegisterPage: React.FC = () => {
    const [role, setRole] = useState<'vendor' | 'charity' | 'donor'>('donor');
    const [walletAddress, setWalletAddress] = useState<string | null>('Please connect your wallet');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [logo, setLogo] = useState<File | null>(null);

    // Vendor Fields
    const [ssm, setSSM] = useState<File | null>(null);
    const [tinNumber, setTinNumber] = useState('');
    const [bankStatement, setBankStatement] = useState<File | null>(null);

    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const activeAccount = useActiveAccount(); 
    const { userRole, roleFetched } = useAuthCheck(); // ✅ Import Role Check
    const navigate = useNavigate();

    // ✅ Auto-Redirect if Role Already Exists
    useEffect(() => {
        if (roleFetched && userRole) {
            console.log(`✅ Found existing role: ${userRole} - Redirecting...`);
            switch (userRole) {
                case 'charity':
                    navigate('/charity');
                    break;
                case 'vendor':
                    navigate('/vendor');
                    break;
                case 'donor':
                    navigate('/donor');
                    break;
                default:
                    console.warn('❗ Unknown role found:', userRole);
                    navigate('/dashboard');
            }
        }
    }, [userRole, roleFetched, navigate]);

    useEffect(() => {
        if (activeAccount?.address) {
            setWalletAddress(activeAccount.address);
            localStorage.setItem('walletAddress', activeAccount.address);
        } else {
            setWalletAddress('Please connect your wallet');
        }
    }, [activeAccount]);

    const handleRegister = async () => {
        const walletAddress = localStorage.getItem('walletAddress');

        if (!walletAddress || walletAddress === 'Please connect your wallet') {
            setError("❗ Please connect your wallet first.");
            return;
        }

        if (!username) {
            setError("❗ Username is required.");
            return;
        }

        setIsRegistering(true);
        setError(null);

        const userData = {
            wallet_address: walletAddress,
            role: role || 'donor', // Auto-set to 'donor' if no role selected
            name: username
        };

        try {
            const { error } = await supabase.from('users').insert(userData);

            if (error) {
                console.error('Error registering:', error.message);
                setError("❌ Failed to register. Please try again.");
            } else {
                alert("✅ Registration successful!");
                if (role === 'charity') {
                    navigate('/Vhack-2025/charity/home');
                } else {
                    navigate(`/${role}`);
                }
                setTimeout(() => {
                    alert("🎉 Redirecting to the homepage...");
                    navigate('/dashboard');  // ✅ Redirect to the dashboard
                }, 2000);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError("❌ Something went wrong. Please try again.");
        }

        setIsRegistering(false);
    };

    return (
        <div className="register-page">
            {/* Left Side - Big Image */}
            <div className="register-left">
                <img src={coverPicture} alt="Register Image" className="register-image" />
            </div>

            {/* Right Side - Registration Form */}
            <div className="register-right">
                <h1>Create an Account</h1>

                {/* Role Tabs */}
                <div className="role-tabs">
                    {['donor', 'charity', 'vendor'].map((r) => (
                        <div
                            key={r}
                            className={`role-tab ${role === r ? 'active' : ''}`}
                            onClick={() => setRole(r as 'vendor' | 'charity' | 'donor')}
                        >
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                        </div>
                    ))}
                </div>

                {/* Auto-filled User Info */}
                <div className="user-info-container">
                    <div className="user-info">
                        <div className="form-group">
                            <label>Wallet Address</label>
                            <input type="text" value={walletAddress} disabled />
                        </div>
                    </div>

                    <div className="connect-button-container">
                        <ConnectAccButton />
                    </div>
                </div>

                {/* Compulsory Username Field */}
                <div className="form-group">
                    <label>Username (Required for Display)</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Register Button */}
                <button
                    className={`register-button ${isRegistering ? 'loading' : ''}`}
                    onClick={handleRegister}
                    disabled={isRegistering}
                >
                    {isRegistering ? 'Registering...' : 'Create an Account'}
                </button>

                <p className="login-footer">
                    Already have an account?
                    <span onClick={() => navigate('/login')} className="link-text"> Log In</span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
