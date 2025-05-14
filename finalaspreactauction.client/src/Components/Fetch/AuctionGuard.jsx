import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { fetchVehicleDataAndMergeToMock } from './../../Components/Fetch/mockjsx';

const AuctionGuard = ({ children }) => {
    const { id } = useParams();
    const [isAllowed, setIsAllowed] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTime = async () => {
            const vehicle = await fetchVehicleDataAndMergeToMock(id);

            if (!vehicle.auctionTime) {
                setIsAllowed(false);
                setLoading(false);
                return;
            }

            const now = new Date();
            const auctionTime = new Date(vehicle.auctionTime);

            if (now >= auctionTime) {
                setIsAllowed(true);
                console.log(auctionTime)
            } else {
                setIsAllowed(false);
                console.log(auctionTime)
            }

            setLoading(false);
        };

        checkTime();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return isAllowed ? children : <Navigate to="/404" />;
};

export default AuctionGuard;
