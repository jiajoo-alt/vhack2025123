import React from 'react';
import { useRole } from '../../../../contexts/RoleContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    const { userRole, isLoading } = useRole();  // Added `isLoading` for better role checking


    return (
        <div className="home-container">
            {/* Common Section - Visible to Everyone */}
            <section className="hero">
                <h1>This is temp dashboard</h1>
                <p>Your current role is: 
                    {isLoading ? ' Loading...' : userRole ? userRole : 'Guest'}
                </p>

                {!isLoading && !userRole && (
                    <div className="cta-buttons">
                        <p>Looks like you haven't registered yet. Join us to get started!</p>
                        <Link to="/register">
                            <button className="primary-button">Get Started</button>
                        </Link>
                        <Link to="/donation">
                            <button className="secondary-button">Explore Campaigns</button>
                        </Link>
                    </div>
                )}
            </section>

            {/* Role-Based Features */}
            {/* {userRole && (
                <section className="role-features">
                    {userRole === 'donor' && (
                        <>
                            <h2>For Donors</h2>
                            <ul>
                                <li><Link to="/donation">Explore Campaigns</Link></li>
                                <li><Link to="/donation/history">View Donation History</Link></li>
                                <li><Link to="/leaderboard">Leaderboard</Link></li>
                            </ul>
                        </>
                    )}

                    {userRole === 'charity' && (
                        <>
                            <h2>For Charities</h2>
                            <ul>
                                <li><Link to="/campaigns">Manage Campaigns</Link></li>
                                <li><Link to="/funds">View Collected Funds</Link></li>
                                <li><Link to="/upload-updates">Upload Project Updates</Link></li>
                            </ul>
                        </>
                    )}

                    {userRole === 'vendor' && (
                        <>
                            <h2>For Vendors</h2>
                            <ul>
                                <li><Link to="/orders">View Orders</Link></li>
                                <li><Link to="/quotations">Manage Quotations</Link></li>
                                <li><Link to="/receipts">Upload Receipts</Link></li>
                            </ul>
                        </>
                    )}
                </section>
            )} */}
        </div>
    );
};

export default HomePage;
