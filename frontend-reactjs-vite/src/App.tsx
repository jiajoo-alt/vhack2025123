import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

import HorizontalNavbar from "./modules/client/navigation/HorizontalNavBar/HorizontalNavBar";
import BottomNavBar from "./modules/client/navigation/BottomNavBar/BottomNavBar";
import ProtectedRoute from "./utils/ProtectedRoute";

// import { useAuthCheck } from "./hooks/useAuthCheck";
import { useRole } from "./contexts/RoleContext"; // New role context
import RegisterPage from "./modules/authentication/Register";

import HomePage from "./modules/client/common/Dashboard";


import ThemeToggle from "./components/Button/ThemeToggleButton";
import CharityPage from "./modules/charity/CharityPage";
import CampaignDetail from "./modules/charity/CampaignDetail";
import OrganizationDetail from "./modules/charity/OrganizationDetail";
import CommunityPage from "./modules/community/CommunityPage";
import CommunityDetail from "./modules/community/CommunityDetail";

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
        return <div>Loading...</div>;  // ✅ Loading shown only during Supabase checks
    }

	return (
		<div className="App">
			<HorizontalNavbar toggle={toggle} />
			<div className="stickyBottm">
				<BottomNavBar toggle={toggle} />
			</div>

			<main>
				{!isConnected ? (
					<div>Welcome, please connect your account.
						<ThemeToggle />
					</div>
				) : (
					<div>Welcome back, your account is connected.
						<ThemeToggle />

					</div>
				)}
			</main>
			<Routes>
				{!isConnected ? (
					<>
                    <Route path="*" element={<Navigate to="/register" replace />} />
				
					<Route path="/register" element={<RegisterPage />} />
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
							{/* path here */}
						</Route>

						{/* Vendor-Specific Routes */}
						<Route element={<ProtectedRoute allowedRoles={['vendor']} redirectPath="/" />}>
							{/* path here */}
						</Route>

						{/* Donor-Specific Routes */}
						<Route element={<ProtectedRoute allowedRoles={['donor']} redirectPath="/" />}>
							{/* path here */}
						</Route>
                    </>
                )}
				
                {/* Default Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
			{/* Footer */}
			<footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
      		  <p>© Vhack2025 - All Rights Reserved</p>
      		</footer>
		</div>
	);
}