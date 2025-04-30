import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { mockVehicleData, mockBidHistory } from '../../Components/Auction/mockData';

const AuctionContext = createContext();

export function AuctionProvider({ children }) {
    const [vehicle, setVehicle] = useState(mockVehicleData);
    const [bidHistory, setBidHistory] = useState(mockBidHistory);
    const [currentBid, setCurrentBid] = useState(vehicle.currentBid);
    const [nextBid, setNextBid] = useState(vehicle.currentBid + vehicle.bidIncrement);
    const [timeRemaining, setTimeRemaining] = useState(vehicle.timeRemaining);
    const [isUserHighBidder, setIsUserHighBidder] = useState(false);
    const [inputBid, setInputBid] = useState('');
    const [bidStatus, setBidStatus] = useState(null);
    const [connection, setConnection] = useState(null);

    // SignalR Connection setup
    useEffect(() => {
        const conn = new HubConnectionBuilder()
            .withUrl('https://localhost:7038/auctionHub') // Your SignalR Hub URL
            .withAutomaticReconnect()
            .build();

        setConnection(conn);

        conn.start().then(() => {
            console.log('SignalR connected');
        }).catch(err => console.error('SignalR connection error:', err));

        conn.on('ReceiveBid', (bidder, bidAmount) => {
            console.log('New bid received:', bidder, bidAmount);
            setCurrentBid(bidAmount);
            setIsUserHighBidder(false); 
            setBidStatus('outbid');
            setBidHistory(prev => [
                { id: Date.now(), amount: bidAmount, bidder, time: new Date().toISOString(), isUser: false },
                ...prev
            ]);
            setTimeout(() => setBidStatus(null), 3000);
        });

        return () => conn.stop(); 
    }, []);

    useEffect(() => {
        setNextBid(currentBid + vehicle.bidIncrement);
    }, [currentBid, vehicle.bidIncrement]);

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

        if (connection.state === 'Connected') {
            connection.invoke('PlaceBid', 'You', numericBid)
                .catch(err => {
                    console.error('Error sending bid:', err);
                });
        }

        const newBid = {
            id: Date.now(),
            amount: numericBid,
            bidder: 'You',
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
        formatCurrency
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
