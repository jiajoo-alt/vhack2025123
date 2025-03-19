import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "./thirdweb.svg";
import { client } from "./client";

import HorizontalNavbar from "./modules/client/navigation/HorizontalNavBar/HorizontalNavBar";
import BottomNavBar from "./modules/client/navigation/BottomNavBar/BottomNavBar";

import ThemeToggle from "./components/Button/ThemeToggleButton";
import CharityPage from "./modules/charity/CharityPage";
import CampaignDetail from "./modules/charity/CampaignDetail";
import OrganizationDetail from "./modules/charity/OrganizationDetail";
import CommunityPage from "./modules/community/CommunityPage";
import CommunityDetail from "./modules/community/CommunityDetail";

export function App() {
	const activeAccount = useActiveAccount();
	// console.log("address", activeAccount?.address);
	const [isConnected, setIsConnected] = useState(false); 

	const [isopen, setisopen] = useState(false);
	
	const toggle = () => {
	  setisopen(!isopen);
	};

	useEffect(() => {
		if (activeAccount?.address) {
		  setIsConnected(true);
		} else {
		  setIsConnected(false);
		}
		console.log("Address:", activeAccount?.address);
	  }, [activeAccount]);

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
				<Route path="/charity" element={<CharityPage />} />
				<Route path="/charity/:id" element={<CampaignDetail />} />
				<Route path="/organization/:id" element={<OrganizationDetail />} />
				<Route path="/community" element={<CommunityPage />} />
				<Route path="/community/:type/:id" element={<CommunityDetail />} />
				{/* <Route path="/campaign" element={<Campaigns />} />
				<Route path="/" element={<Dashboard />} />
				<Route path="/campaign/:address" element={<CampaignDetails data={[]} />} />
				<Route path="/user" element={<ProfilePage />} />
				<Route path="/user/:userAddress" element={<UserDetails />} />
				<Route path="/scan" element={<QRScanner />} />
				<Route path="*" element={<WelcomeUser />} /> */}
			</Routes>
			{/* Footer */}
			<footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
      		  <p>© Vhack2025 - All Rights Reserved</p>
      		</footer>
		</div>
	);
}