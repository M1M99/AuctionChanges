import React from 'react';
import { AuthProvider, useAuth } from "../Example/AuthContext";
import Favorites from "./Favorite";
import { User, Heart, Settings } from 'lucide-react';
import VehiclesWonAtBit from '../Fetch/WonAtBid';

const Dashboard = () => {
    const { userId } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" style={{ marginTop: "-10px" }}>
            <AuthProvider>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="mb-8">
                        <h1 className="text-3xl" id="dashBoard1" style={{
                            fontWeight: "bold"
                        }}>Dashboard</h1>
                        <p className="mt-2 text-gray-600">Manage your favorites and account settings</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                {/*<Heart className="w-6 h-6 text-red-500" />*/}
                                <h2 className="text-2xl m-2">Favorite Cars</h2>
                            </div>
                            <div className="space-y-4">
                                <Favorites userId={userId} />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-1 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <User className="w-10 h-7 text-blue-500" />
                                <h2 className="text-xl font-semibold text-gray-700 my-auto">Your Account</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer mt-2">
                                    <div className="flex items-center gap-3">
                                        <Settings className="w-5 h-5 text-gray-600" />
                                        <span className="text-gray-700">Account Settings</span>
                                    </div>
                                </div>
                            <VehiclesWonAtBit />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </div>
    );
};

export default Dashboard;