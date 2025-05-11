import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, X, PlayCircle, ChevronRight, AlertCircle, DollarSign } from 'lucide-react';
import './CarDetailPage.css';
import { useParams } from 'react-router-dom';

const BookmarkToggle = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <button
            className={`bookmark-button ${isBookmarked ? 'active' : ''}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        >
            <Heart
                className={`bookmark-icon ${isBookmarked ? 'filled' : ''}`}
                size={20}
            />
            <span>{isBookmarked ? 'Saved' : 'Save'}</span>
        </button>
    );
};

const CarDetailPage = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
    const [modelData, setModelData] = useState(null);
    const [brandData, setBrandData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://localhost:7038/api/Car/GetById?id=${id}`);
                setCarData(response.data);
                console.log(response)

                
                const modelResponse = await axios.get(`https://localhost:7038/api/Model/GetById?id=${response.data.modelId}`);
                setModelData(modelResponse.data);


                const brandResponse = await axios.get(`https://localhost:7038/api/Brand/GetById?id=${response.data.makeId}`);
                setBrandData(brandResponse.data);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching car data:', err);
                setError('Failed to fetch car data. Please try again later.');
                setLoading(false);
            }
        };

        fetchCarData();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading car details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <AlertCircle size={48} className="error-icon" />
                <h3>Error</h3>
                <p>{error}</p>
                <button className="retry-button" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const toggleVideoPlay = () => {
        const video = document.getElementById('car-video');
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsVideoPlaying(true);
        } else {
            video.pause();
            setIsVideoPlaying(false);
        }
    };

    const openImageModal = () => {
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
    };

    return (
        <div className="car-detail-page">
            <header className="car-detail-header">
                <h1>
                    {brandData?.name} {modelData?.name} {carData?.year}
                </h1>
                <p className="car-vin">VIN: {carData?.vin}</p>
            </header>

            <div className="car-detail-content">
                <div className="media-section">
                    <div className="main-image-container" onClick={openImageModal}>
                        <img
                            src={carData?.imageUrl}
                            alt={`${carData?.year} ${brandData?.name} ${modelData?.name}`}
                            className="main-image"
                        />
                        <div className="zoom-indicator">
                            <span>Click to zoom</span>
                        </div>
                    </div>

                    <div className="video-container">
                        <div className="video-wrapper">
                            <video
                                id="car-video"
                                src={carData?.videoUrl}
                                loop
                                muted
                                controls={false}
                                autoPlay={false}
                                poster={carData?.imageUrl}
                                className="car-video"
                                onClick={toggleVideoPlay}
                                onPlay={() => setIsVideoPlaying(true)}
                                onPause={() => setIsVideoPlaying(false)}
                            />
                            {!isVideoPlaying && (
                                <div className="video-overlay" onClick={toggleVideoPlay}>
                                    <PlayCircle size={64} color="#fff" />
                                    <span>Play Video</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="info-section">
                    <div className={`info-card ${isFlipped ? 'flipped' : ''}`}>
                        <div className="card-inner">
                            <div className="card-front">
                                <h2>Vehicle Information</h2>
                                <div className="car-specs">
                                    <div className="spec-item">
                                        <span className="spec-label">Price</span>
                                        <span className="spec-value">{carData?.price}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Origin</span>
                                        <span className="spec-value">{carData?.country}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Fuel Type</span>
                                        <span className="spec-value">{carData?.fuelType}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Engine</span>
                                        <span className="spec-value">{carData?.engine}L</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Mileage</span>
                                        <span className="spec-value">{carData?.otometer}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Branch</span>
                                        <span className="spec-value">{carData?.branch}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Vin</span>
                                        <span className="spec-value">{carData?.vin}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Cylinder</span>
                                        <span className="spec-value">{carData?.cylinder}</span>
                                    </div>
                                    <div className="spec-item">
                                        <span className="spec-label">Damage</span>
                                        <span className="spec-value">{carData?.damage || 'None'}</span>
                                    </div>
                                </div>
                                <button className="flip-button" onClick={handleFlip}>
                                    See Description <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="card-back">
                                <h2>Description</h2>
                                <p className="car-description">{carData?.description}</p>
                                <button className="flip-button" onClick={handleFlip}>
                                    See Specs <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bid-section">
                        <h2>Bid Information</h2>
                        <div className="bid-details">
                            <div className="current-bid">
                                <div>
                                    <span className="bid-label" style={{ textAlign: "center", fontWeight: "600" }}>Current Bid</span>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <DollarSign size={23} />
                                        <span className="bid-amount">{carData?.price}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bid-stats">
                                <div className="bid-stat">
                                    <span className="stat-value">{carData?.bidsCount}</span>
                                    <span className="stat-label">Bids</span>
                                </div>
                                <div className="bid-stat">
                                    <span className="stat-value">{carData?.timeLeft}</span>
                                    <span className="stat-label">Time Left</span>
                                </div>
                            </div>
                        </div>
                        <div className="bid-actions">
                            <button className="place-bid-button">
                                Place Bid
                            </button>
                            <BookmarkToggle />
                        </div>
                    </div>
                </div>
            </div>

            {showImageModal && (
                <div className="image-modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={closeImageModal}>
                            <X size={24} />
                        </button>
                        <img
                            src={carData?.imageUrl}
                            alt={`${carData?.year} ${brandData?.name} ${modelData?.name}`}
                            className="modal-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetailPage;
