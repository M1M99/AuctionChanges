import { useEffect, useState } from 'react';
import { useAuction } from '../../Components/Auction/AuctionContext';
import './../Auction/AuctionCss/VehicleGallery.css';

function VehicleGallery() {
    const { vehicle } = useAuction();

    if (!vehicle || !vehicle.images) {
        return <div>Loading vehicle images...</div>;
    }

    const imageList = Array.isArray(vehicle.images) ? vehicle.images : [vehicle.images];
    const videoList = Array.isArray(vehicle.video) ? vehicle.video : [vehicle.video];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
        );
    };

    const selectSlide = (index) => {
        setActiveIndex(index);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isFullscreen) return;

            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'Escape') {
                setIsFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    return (
        <div className={`vehicle-gallery ${isFullscreen ? 'gallery-fullscreen' : ''}`}>
            <div className="gallery-main">
                <div className="gallery-image-container">
                    <img
                        src={imageList[activeIndex]}
                        alt={`${vehicle.title} - Image ${activeIndex + 1}`}
                        className="gallery-image"
                    />

                    <div className="gallery-controls">
                        <button
                            className="gallery-control gallery-prev"
                            onClick={prevSlide}
                            aria-label="Previous image"
                        >
                            &#10094;
                        </button>
                        <button
                            className="gallery-control gallery-next"
                            onClick={nextSlide}
                            aria-label="Next image"
                        >
                            &#10095;
                        </button>
                        <button
                            className="gallery-fullscreen-toggle"
                            onClick={toggleFullscreen}
                            aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
                        >
                            {isFullscreen ? '✕' : '⤢'}
                        </button>
                    </div>

                    <div className="gallery-caption">
                        {activeIndex + 1} / {imageList.length}
                    </div>
                </div>
            </div>

            <div className="gallery-thumbnails">
                {imageList.map((image, index) => (
                    <div
                        key={index}
                        className={`gallery-thumbnail ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => selectSlide(index)}
                    >
                        <img
                            src={image}
                            alt={`${vehicle.title} - Thumbnail ${index + 1}`}
                            className="thumbnail-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleGallery;
