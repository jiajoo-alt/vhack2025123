import React, { useState, useEffect } from 'react';
import supabase from '../../../services/supabase/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useActiveAccount } from 'thirdweb/react'; // Assuming you're using thirdweb
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

    const activeAccount = useActiveAccount(); // For wallet connection
    const navigate = useNavigate();

    useEffect(() => {
        if (activeAccount?.address) {
            setWalletAddress(activeAccount.address);
            localStorage.setItem('walletAddress', activeAccount.address); // Store in localStorage
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
            console.log("walletAddress", walletAddress);
            return;
        }
    
        setIsRegistering(true);
        setError(null);
    
        const userData = {
            wallet_address: walletAddress,
            role: role || 'donor',   // Auto-set to 'donor' if no role selected
            name: username
        };
    
        try {
            const { error } = await supabase.from('users').insert(userData);
    
            if (error) {
                console.error('Error registering:', error.message);
                setError("❌ Failed to register. Please try again.");
            } else {
                alert("✅ Registration successful!");
                setTimeout(() => {
                    alert("🎉 Redirecting to the homepage...");
                }, 2000);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            setError("❌ Something went wrong. Please try again.");
        }
    
        setIsRegistering(false);
    };

    // const handleRegister = async () => {
    //     navigate('/'); // Navigate to the desired route
    // };


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
                    {/* Left Section - User ID and Wallet Address */}
                    <div className="user-info">
                        <div className="form-group">
                            <label>Wallet Address</label>
                            <input type="text" value={walletAddress} disabled />
                        </div>
                    </div>

                    {/* Right Section - Connect Button */}
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

                {/* Additional Fields for Charity */}
                {role === 'charity' && (
                    <div className="charity-fields">
                        <div className="form-group">
                            <label>Logo (Optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogo(e.target.files?.[0] || null)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <textarea
                                placeholder="Tell us about your charity"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Location (Optional)</label>
                            <input
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Website (Optional)</label>
                            <input
                                type="url"
                                placeholder="https://yourwebsite.com"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email (Optional)</label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone (Optional)</label>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                )}


                {/* Additional Fields for Vendor */}
                {role === 'vendor' && (
                    <div className="vendor-fields">

                        {/* SSM Field */}
                        <div className="form-group">
                            <label>SSM (Required)</label>
                            <input
                                type="file"
                                accept=".pdf, .jpg, .png"
                                onChange={(e) => setSSM(e.target.files?.[0] || null)}
                            />
                            {ssm && (
                                <p className="file-preview">
                                    📄 {ssm.name}
                                </p>
                            )}
                        </div>

                        {/* Company TIN Number */}
                        <div className="form-group">
                            <label>Company TIN Number (Required)</label>
                            <input
                                type="text"
                                placeholder="Enter Company TIN Number"
                                value={tinNumber}
                                onChange={(e) => setTinNumber(e.target.value)}
                            />
                        </div>

                        {/* Business Bank Statement */}
                        <div className="form-group">
                            <label>Business Bank Statement (Required)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setBankStatement(e.target.files?.[0] || null)}
                            />
                            {bankStatement && (
                                <p className="file-preview">
                                    📄 {bankStatement.name}
                                </p>
                            )}
                        </div>
                    </div>
                )}

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
