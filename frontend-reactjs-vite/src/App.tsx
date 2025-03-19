import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

import HorizontalNavbar from "./modules/client/navigation/HorizontalNavBar/HorizontalNavBar";
import BottomNavBar from "./modules/client/navigation/BottomNavBar/BottomNavBar";

// import { useAuthCheck } from "./hooks/useAuthCheck";
import { useRole } from "./contexts/RoleContext"; // New role context
import RegisterPage from "./modules/authentication/Register";

import HomePage from "./modules/client/common/Dashboard";


import ThemeToggle from "./components/Button/ThemeToggleButton";
import CharityPage from "./modules/charity/CharityPage";
import CampaignDetail from "./modules/charity/CampaignDetail";
import OrganizationDetail from "./modules/charity/OrganizationDetail";

export function App() {
	const activeAccount = useActiveAccount();
	console.log("address", activeAccount?.address);
    const { userRole, isLoading, clearRole } = useRole();
	console.log("userRole", userRole);
	
	const [isConnected, setIsConnected] = useState(false); 
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

    // Show Loading State while Supabase is checking
	if (isLoading) {
        return <div>Loading...</div>;  
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
                {/* Register Route for New Users */}
                {!isLoading && !userRole && <Route path="*" element={<RegisterPage />} />}

                {/* Common Routes - Available to All Roles */}
                <Route path="/" element={<HomePage />} />
				<Route path="/charity" element={<CharityPage />} />
				<Route path="/charity/:id" element={<CampaignDetail />} />
				<Route path="/organization/:id" element={<OrganizationDetail />} />

                {/* Charity-Specific Routes */}
				{/* Template is as below */}
                {/* <Route
                    path= "/charity"
                    element={
                        userRole === 'charity' ? (
							<CharityPage />
                        ) : (
                            <Navigate to="/" replace />
                        )
                    }
                /> */}

				{/* Vendor-Specific Routes */}

				{/* Donor-Specific Routes */}

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