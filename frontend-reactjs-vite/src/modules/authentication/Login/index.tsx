import { useActiveAccount } from "thirdweb/react";
import { useAuthCheck } from "../../../hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginButton from "../../../components/Button/LoginButton";
import logoPNGImage from "../../../assets/images/logo-png.png";
import profilePicture1 from "../../../assets/images/profile-picture-login-1.jpg";
import './index.css';

const LoginPage = () => {
    const activeAccount = useActiveAccount();
    const navigate = useNavigate();
    const [isConnecting, setIsConnecting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    const { userRole, roleChecked, isLoading } = useAuthCheck();

    useEffect(() => {
        console.log("🔎 Checking conditions:");
        console.log("✅ activeAccount:", activeAccount?.address);
        console.log("✅ roleChecked:", roleChecked);
        console.log("✅ isLoading:", isLoading);
        console.log("✅ userRole:", userRole);

        // Prevent logic if still loading or no account
        if (!activeAccount || isLoading) return;

        // Ensure `roleChecked` has completed before navigating
        if (!roleChecked) return;

        if (userRole) {
            console.log("🎯 Role Found:", userRole);
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
                    navigate('/register');  // Unknown role? Ask them to register
            }
        } else {
            console.log("⚠️ No role found — Sending to Register");
            navigate('/register');
        }
    }, [activeAccount, roleChecked, userRole, isLoading, navigate]);
    // useEffect(() => {
    //     if (activeAccount) {
    //         console.log("HERE AHH activeAccount", activeAccount);
    //         const userRole = localStorage.getItem('userRole');
    //         console.log("HERE AHH userRole", userRole);
    //         if (userRole) {
    //             // console.log("HEREEEE", userRole);
    //             navigate('/charity');
    //         } else {
    //             // navigate('/register');
    //         }
    //     }
    // }, [activeAccount, navigate]);

    const handleConnectWallet = async () => {
        if (!isChecked) {
            setError('❗ Please accept the Privacy Policy to continue.');
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            // Simulate connection delay for better UX
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert("✅ Wallet connected successfully!");
        } catch (err) {
            setError('❌ Failed to connect wallet. Please try again.');
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left Side - Branding & Message */}
            <div className="login-left">
                <div className="brand-logo">
                    <img src={logoPNGImage} alt="DermaNow Logo" className="logo-login" />
                </div>
                <h1>Empower Generosity, Inspire Change</h1>
                <p>Your donations make a difference. Track your impact in real-time.</p>

                <div className="testimonial">
                    <p>
                        "DermaNow has revolutionized the way I connect with charities. It’s fast, secure, and simple. Highly recommended!"
                    </p>
                    <div className="testimonial-author">
                        <img src={profilePicture1} alt="Casey Bachmeyer" className=""/>
                        <div className="author-details">
                            <span className="author-name">Casey Bachmeyer</span>
                            <span className="author-position">Philanthropist</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="login-right">
                <h2>Login</h2>

                <p className="welcome-message">
                    Join a growing community of donors creating positive change.
                </p>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                <LoginButton />

                {/* Security Info */}
                <div className="security-info">
                    <p>🔒 Your transactions are secure with blockchain technology.</p>
                </div>

                {/* Support Links */}
                <div className="support-links">
                    <span onClick={() => navigate('/faq')} className="link-text">❓ FAQ</span>
                    <span onClick={() => navigate('/contact')} className="link-text">📩 Contact Us</span>
                </div>

                {/* Register Link */}
                <p className="signup-footer">
                    Don't have an account yet? 
                    <span onClick={() => navigate('/register')} className="link-text"> Sign Up</span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
