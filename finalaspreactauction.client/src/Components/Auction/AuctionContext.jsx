import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { mockBidHistory } from '../../Components/Auction/mockData';
import { fetchVehicleDataAndMergeToMock } from '../Fetch/mockjsx';
import { useParams } from 'react-router-dom';
import { useAuth } from './../Example/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuctionContext = createContext();

export function AuctionProvider({ children }) {
    const [vehicle, setVehicle] = useState(null); 
    const [bidHistory, setBidHistory] = useState(mockBidHistory);
    const [currentBid, setCurrentBid] = useState(0);
    const [nextBid, setNextBid] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isUserHighBidder, setIsUserHighBidder] = useState(false);
    const [inputBid, setInputBid] = useState('');
    const [bidStatus, setBidStatus] = useState(null);
    const [connection, setConnection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [winSubmitted, setWinSubmitted] = useState(false);
    const { userId, userName } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadVehicleData = async () => {
            try {
                const vehicleFromApi = await fetchVehicleDataAndMergeToMock(id);
                setVehicle(vehicleFromApi);
                setCurrentBid(vehicleFromApi.currentBid);
                setNextBid(vehicleFromApi.currentBid + vehicleFromApi.bidIncrement);
                setTimeRemaining(vehicleFromApi.timeRemaining);
            } catch (err) {
                setError('Failed to load vehicle data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadVehicleData();
    }, [id]);

    useEffect(() => {
        if (userId == null) {
            navigate("/#", { state: { alert: "Please First Sign In" } });
            return;
        }
        
        const conn = new HubConnectionBuilder()
            .withUrl('https://localhost:7038/auctionHub')
            .withAutomaticReconnect()
            .build();

        conn.start()
            .then(() => console.log('SignalR connected'))
            .catch(err => console.error('SignalR connection error:', err));

        setConnection(conn);

        conn.on('ReceiveBid', (bidder, bidAmount) => {
            setCurrentBid(bidAmount);
            setIsUserHighBidder(bidder === userName);
            setBidStatus(bidder === userName ? 'success' : 'outbid');
            setBidHistory(prev => [
                { id: Date.now(), amount: bidAmount, bidder, time: new Date().toISOString(), isUser: bidder === userName },
                ...prev
            ]);
            setTimeout(() => setBidStatus(null), 3000);
        });

        return () => {
            conn.off('ReceiveBid');
            conn.off('Error');
            conn.stop();
        };
    }, [userId, userName, navigate]);

    useEffect(() => {
        if (vehicle) {
            setNextBid(currentBid + vehicle.bidIncrement);
        }
    }, [currentBid, vehicle]);

    useEffect(() => {
        if (timeRemaining === 0 && isUserHighBidder && vehicle && !winSubmitted) {
            const winnerData = {
                userId: userId,
                carId: vehicle.id
            };

            setWinSubmitted(true); // Mark as submitted before making the request

            fetch('https://localhost:7038/api/Winner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(winnerData)
            })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to submit winner');
                    return res.text();
                })
                .then(data => {
                    console.log('Winner recorded successfully:', data);
                })
                .catch(err => {
                    console.error('Error recording winner:', err);
                    setWinSubmitted(false); // Reset if submission failed
                });
        }
    }, [timeRemaining, isUserHighBidder, vehicle, userId, winSubmitted]);

    useEffect(() => {
        if (timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    const placeBid = (bidAmount) => {
        const numericBid = Number(bidAmount);

        if (isNaN(numericBid) || numericBid <= currentBid) {
            setBidStatus('error');
            setTimeout(() => setBidStatus(null), 3000);
            return false;
        }

        setCurrentBid(numericBid);
        setIsUserHighBidder(true);
        setBidStatus('success');

        if (connection && connection.state === 'Connected') {
            connection.invoke('PlaceBid', userName, numericBid)
                .catch(err => console.error('Error sending bid:', err));
        }

        const newBid = {
            id: userId,
            amount: numericBid,
            bidder: userName,
            time: new Date().toISOString(),
            isUser: true
        };

        setBidHistory(prev => [newBid, ...prev]);
        setInputBid('');
        setTimeout(() => setBidStatus(null), 3000);

        return true;
    };

    const formatTimeRemaining = () => {
        if (timeRemaining <= 0) return 'Auction Ended';

        const days = Math.floor(timeRemaining / (60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
        const seconds = Math.floor(timeRemaining % 60);

        if (days > 0) return `${days}d ${hours}h ${minutes}m`;
        if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
        if (minutes > 0) return `${minutes}m ${seconds}s`;
        return `${seconds}s`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const value = {
        vehicle,
        bidHistory,
        currentBid,
        nextBid,
        timeRemaining,
        isUserHighBidder,
        bidStatus,
        inputBid,
        setInputBid,
        placeBid,
        formatTimeRemaining,
        formatCurrency,
        loading,
        error
    };

    return (
        <AuctionContext.Provider value={value}>
            {children}
        </AuctionContext.Provider>
    );
}

AuctionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useAuction() {
    const context = useContext(AuctionContext);
    if (!context) {
        throw new Error('useAuction must be used within an AuctionProvider');
    }
    return context;
}

export default AuctionProvider;