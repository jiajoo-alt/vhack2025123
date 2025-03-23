import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import "./App.css";

import HorizontalNavbar from "./modules/client/navigation/HorizontalNavBar/HorizontalNavBar";
import BottomNavBar from "./modules/client/navigation/BottomNavBar/BottomNavBar";
import ProtectedRoute from "./utils/ProtectedRoute";

// import { useAuthCheck } from "./hooks/useAuthCheck";
import { useRole } from "./contexts/RoleContext"; // New role context
import RegisterPage from "./modules/authentication/Register";
import ConnectWalletPage from "./modules/authentication/ConnectWallet";
import LoginPage from "./modules/authentication/Login";
import HomePage from "./modules/client/common/Dashboard";


import ThemeToggle from "./components/Button/ThemeToggleButton";
import CharityPage from "./modules/client/common/charity/CharityPage";
import CampaignDetail from "./modules/client/common/charity/CampaignDetail";
import OrganizationDetail from "./modules/client/common/charity/OrganizationDetail";
import CommunityPage from "./modules/client/common/community/CommunityPage";
import CommunityDetail from "./modules/client/common/community/CommunityDetail";
import DonorProfile from "./modules/client/donor/profile/DonorProfile";
import CharityProfile from "./modules/client/charity/profile/CharityProfile";

export function App() {
	const activeAccount = useActiveAccount();
	console.log("address", activeAccount?.address);
    const { userRole, isLoading, roleChecked, clearRole } = useRole();
	console.log("userRole", userRole);
	
	const [isConnected, setIsConnected] = useState(false); 
	
    const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);

    const toggleConnect = () => setIsConnected(!isConnected);

	const navigate = useNavigate();
	const [isopen, setisopen] = useState(false);
	
	const toggle = () => setisopen(!isopen);

	useEffect(() => {
		if (activeAccount?.address) {
		  setIsConnected(true);
		  localStorage.setItem('walletAddress', activeAccount.address);
		} else {
		  setIsConnected(false);
		  clearRole();  
		}
		console.log("Address: now", activeAccount?.address);
	  }, [activeAccount]);

	  if (!roleChecked) {
        return <div>Loading in app.tsx...</div>;  // ✅ Loading shown only during Supabase checks
    }

	return (
		<div className="App">
			<HorizontalNavbar toggle={toggle} />
			<div className="stickyBottm">
				<BottomNavBar toggle={toggle} />
			</div>
			<Routes>
				{/* {(!isConnected ) ? ( */}
				{(!isConnected || !roleChecked) ? (
					<>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
            			<Route path="*" element={<Navigate to="/login" replace />} />
					</>
                ) : (
					<>
                        {/* Common Routes - Available to All Roles */}
						<Route element={<ProtectedRoute allowedRoles={['charity', 'vendor', 'donor']} redirectPath="/" />}>
							<Route path="/" element={<HomePage />} />
							<Route path="/charity" element={<CharityPage />} />
							<Route path="/charity/:id" element={<CampaignDetail />} />
							<Route path="/organization/:id" element={<OrganizationDetail />} />
							<Route path="/community" element={<CommunityPage />} />
							<Route path="/community/:type/:id" element={<CommunityDetail />} />
						</Route>

						{/* Charity-Specific Routes */}
						<Route element={<ProtectedRoute allowedRoles={['charity']} redirectPath="/" />}>
							<Route path="/Vhack-2025/charity/profile" element={<CharityProfile />} />
						</Route>

						{/* Vendor-Specific Routes */}
						<Route element={<ProtectedRoute allowedRoles={['vendor']} redirectPath="/" />}>
							{/* path here */}
						</Route>

						{/* Donor-Specific Routes */}
						<Route element={<ProtectedRoute allowedRoles={['donor']} redirectPath="/" />}>
							<Route path="/donor/profile" element={<DonorProfile />} />
						</Route>

						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
                    </>
                )}
				
                {/* Default Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
			{/* Footer */}
			<footer className="footer">
				<p>© Vhack2025 - All Rights Reserved</p>
      		</footer>
		</div>
	);
}