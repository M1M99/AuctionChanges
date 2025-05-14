import { useState, useEffect } from 'react';
import { useAuction } from '../../Components/Auction/AuctionContext';
import './../Auction/AuctionCss/BiddingInterface.css';
import { useNavigate } from 'react-router-dom';
function BiddingInterface() {
    const {
        vehicle,
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
    } = useAuction();
    const navigate = useNavigate();
    const [timeClass, setTimeClass] = useState('');

    useEffect(() => {
        if (timeRemaining === 0) {
            setTimeClass('time-ended');
        } else if (timeRemaining < 60) {
            setTimeClass('time-critical');
        } else if (timeRemaining < 300) {
            setTimeClass('time-warning');
        } else {
            setTimeClass('');
        }
    }, [timeRemaining]);

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setInputBid(value);
    };

    const handleCustomBid = (e) => {
        e.preventDefault();
        if (inputBid && Number(inputBid) > currentBid) {
            placeBid(Number(inputBid));
        }
    };

    const handleQuickBid = () => {
        placeBid(nextBid);
    };

    const handleAlternativeBid = (multiplier) => {
        const bidAmount = currentBid + (vehicle?.bidIncrement || 0) * multiplier;
        placeBid(bidAmount);
    };

    const isAuctionEnded = timeRemaining === 0;

    if (!vehicle) {
        return <div style={{ fontFamily:"Roboto" }}>Loading vehicle data...</div>;  
    }

    return (
        <div className="bidding-interface">
            <div className="bidding-header">
                <h2 className="bidding-title">Place Your Bid</h2>
                <div className={`bidding-timer ${timeClass}`}>
                    <span className="timer-icon">⏱</span>
                    <span className="timer-text">{formatTimeRemaining()}</span>
                </div>
            </div>

            <div className="bidding-status">
                <div className="current-bid">
                    <span className="status-label">Current Bid:</span>
                    <span className="status-value">{formatCurrency(currentBid)}</span>
                </div>

                {isUserHighBidder && (
                    <div className="bidder-status">
                        <span className="status-badge status-high-bidder">You're the high bidder!</span>
                    </div>
                )}

                {bidStatus === 'success' && (
                    <div className="bid-notification success">
                        <span className="notification-icon">✓</span>
                        <span className="notification-text">Bid placed successfully!</span>
                    </div>
                )}

                {bidStatus === 'error' && (
                    <div className="bid-notification error">
                        <span className="notification-icon">✕</span>
                        <span className="notification-text">Bid must be higher than current bid</span>
                    </div>
                )}

                {bidStatus === 'outbid' && (
                    <div className="bid-notification outbid">
                        <span className="notification-icon">⚠</span>
                        <span className="notification-text">You've been outbid!</span>
                    </div>
                )}
            </div>

            {!isAuctionEnded ? (
                <>
                    <div className="bidding-form-container">
                        <form className="bidding-form" onSubmit={handleCustomBid}>
                            <div className="bid-input-wrapper">
                                <span className="bid-currency">$</span>
                                <input
                                    type="text"
                                    className="bid-input"
                                    value={inputBid}
                                    onChange={handleInputChange}
                                    placeholder={nextBid.toString()}
                                    disabled={isAuctionEnded}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bid-submit"
                                disabled={isAuctionEnded || !inputBid || Number(inputBid) <= currentBid}
                            >
                                Place Bid
                            </button>
                        </form>

                        <div className="bid-separator">
                            <span className="separator-text">OR</span>
                        </div>

                        <div className="quick-bid">
                            <button
                                className="quick-bid-button"
                                onClick={handleQuickBid}
                                disabled={isAuctionEnded}
                            >
                                Bid {formatCurrency(nextBid)}
                            </button>
                        </div>
                    </div>

                    <div className="alternative-bids">
                        <button
                            className="alt-bid-button"
                            onClick={() => handleAlternativeBid(2)}
                            disabled={isAuctionEnded}
                        >
                            Bid {formatCurrency(currentBid + (vehicle?.bidIncrement || 0) * 2)}
                        </button>
                        <button
                            className="alt-bid-button"
                            onClick={() => handleAlternativeBid(5)}
                            disabled={isAuctionEnded}
                        >
                            Bid {formatCurrency(currentBid + (vehicle?.bidIncrement || 0) * 5)}
                        </button>
                        <button
                            className="alt-bid-button"
                            onClick={() => handleAlternativeBid(10)}
                            disabled={isAuctionEnded}
                        >
                            Bid {formatCurrency(currentBid + (vehicle?.bidIncrement || 0) * 10)}
                        </button>
                    </div>
                </>
            ) : (
                <div className="auction-ended">
                    <p className="ended-message">This auction has ended</p>
                    {isUserHighBidder ? (
                        <div className="ended-status winner">
                            <span className="status-icon">🏆</span>
                            <span className="status-text">Congratulations! You won this auction!</span>
                        </div>
                    ) : (
                        <div className="ended-status">
                            <span className="status-text">Final Bid: {formatCurrency(currentBid)}</span>
                        </div>
                    )}
                        <button className="similar-items-button"
                            onClick={() => navigate(`/getCarByBrand/${vehicle.brandId}`)}
                        >View Similar Vehicles</button>
                </div>
            )}

            <div className="bidding-info">
                <div className="info-item">
                    <span className="info-icon">ℹ</span>
                    <span className="info-text">Bid increment: {formatCurrency(vehicle.bidIncrement)}</span>
                </div>
                <div className="info-item">
                    <span className="info-icon">ℹ</span>
                    <span className="info-text">Buy Now Price: {formatCurrency(vehicle.buyNowPrice)}</span>
                </div>
                <div className="info-item">
                    <span className="info-icon">ℹ</span>
                    <span className="info-text">Reserve Price: {vehicle.reservePrice ? formatCurrency(vehicle.reservePrice) : 'No Reserve'}</span>
                </div>
            </div>

            <div className="buy-now-section">
                <button className="buy-now-button" disabled={isAuctionEnded}>
                    Buy Now for {formatCurrency(vehicle.buyNowPrice)}
                </button>
                <p className="buy-now-info">Skip the auction and buy instantly</p>
            </div>
        </div>
    );
}

export default BiddingInterface;
