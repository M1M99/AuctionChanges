import { useState, useEffect } from 'react';
import axios from 'axios';
import './CarGallery.css';
import key  from './../../assets/1068722.png'
function GetPP() {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCar, setSelectedCar] = useState(null);

    const makeUrl = "https://localhost:7038/api/Brand/GetAll";
    const modelUrl = "https://localhost:7038/api/Model/GetAllModel";

    useEffect(() => {
        axios.get("https://localhost:7038/api/Car/GetP/P")
            .then((res) => {
                setCars(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        fetch(makeUrl)
            .then((response) => response.json())
            .then((res) => {
                setMakes(res);
            })
            .catch((error) => {
                console.error("Error fetching makes data:", error);
                setMakes([]);
            });

        fetch(modelUrl)
            .then((response) => response.json())
            .then((res) => {
                setModels(res);
            })
            .catch((error) => {
                console.error("Error fetching models data:", error);
                setModels([]);
            });
    }, []);

    const getMakeName = (makeId) => {
        const make = makes.find(m => m.id === makeId);
        return make ? make.name : "Unknown Make";
    };

    const getModelName = (modelId) => {
        const model = models.find(m => m.id === modelId);
        return model ? model.name : "Unknown Model";
    };

    const handleViewDetails = (car) => {
        setSelectedCar(car);
    };

    const closeDetails = () => {
        setSelectedCar(null);
    };

    if (loading) {
        return (
            <div className="car-gallery">
                <h2 className="gallery-title">Discovering Premium Cars</h2>
                <div className="gallery-container">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="car-card skeleton">
                            <div className="car-image-skeleton"></div>
                            <div className="car-info-skeleton">
                                <div className="car-title-skeleton"></div>
                                <div className="car-details-skeleton"></div>
                                <div className="car-price-skeleton"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="car-gallery">
                <div className="error-container">
                    <div className="error-icon">!</div>
                    <h3>Unable to Load Cars</h3>
                    <p>{error}</p>
                    <button className="retry-button" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="car-gallery">
            <h2 className="gallery-title">Premium Selection: {cars.length} Exceptional Cars</h2>

            <div className="gallery-container">
                {cars.map((car) => (
                    <div key={car.id} className="car-card">
                        <div className="car-image-container">
                            {car.imageUrl ? (
                                <img
                                    src={car.imageUrl}
                                    alt={`${getMakeName(car.makeId)} ${getModelName(car.modelId)}`}
                                    className="car-image"
                                />
                            ) : (
                                <div className="car-image-placeholder">
                                    <span>No Image Available</span>
                                </div>
                            )}
                            {car.isNew && <span className="car-tag new-tag">New</span>}
                            {car.isFeatured && <span className="car-tag featured-tag">Featured</span>}
                        </div>

                        <div className="car-info">
                            <h3 className="car-title">
                                {getMakeName(car.makeId)} {getModelName(car.modelId)}
                            </h3>

                            <div className="car-specs">
                                <div className="spec-item">
                                    <span className="spec-icon">⚙️</span>
                                    <span>{car.transmission || "Auto"}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-icon">📅</span>
                                    <span>{car.year || "N/A"}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-icon">⛽</span>
                                    <span>{car.fuelType || "Petrol"}</span>
                                </div>
                                <div className="spec-item">
                                    <img src={key} width="25px"></img>
                                    <span>{car.key || "Petrol"}</span>
                                </div>
                            </div>

                            <div className="car-description">
                                {car.description?.substring(0, 100) || "Experience exceptional performance and comfort with this premium vehicle."}{car.description?.length > 100 ? "..." : ""}
                            </div>

                            <div className="car-footer">
                                <div className="car-price">
                                    ${car.price?.toLocaleString() || "Call for price"}
                                </div>
                                <button className="view-details-button" onClick={() => handleViewDetails(car)}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCar && (
                <div className="modal-overlay" onClick={closeDetails}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeDetails}>×</button>
                        <div className="modal-image-container">
                            {selectedCar.imageUrl ? (
                                <img
                                    src={selectedCar.imageUrl}
                                    alt={`${getMakeName(selectedCar.makeId)} ${getModelName(selectedCar.modelId)}`}
                                    className="modal-image"
                                />
                            ) : (
                                <div className="modal-image-placeholder">No Image Available</div>
                            )}
                        </div>
                        <div className="modal-info">
                            <h2 className="modal-title">
                                {getMakeName(selectedCar.makeId)} {getModelName(selectedCar.modelId)}
                            </h2>

                            <div className="modal-specs">
                                <div className="modal-spec-item">
                                    <strong>Year:</strong> {selectedCar.year || "N/A"}
                                </div>
                                <div className="modal-spec-item">
                                    <strong>Transmission:</strong> {selectedCar.transmission || "Auto"}
                                </div>
                                <div className="modal-spec-item">
                                    <strong>Fuel Type:</strong> {selectedCar.fuelType || "Petrol"}
                                </div>
                                <div className="modal-spec-item">
                                    <strong>Price:</strong> ${selectedCar.price?.toLocaleString() || "Call for price"}
                                </div>
                                <div className="modal-spec-item">
                                    <strong>Milage:</strong> {selectedCar.otometer?.toLocaleString() || "Call for milage"}
                                </div>
                                <div className="modal-spec-item">
                                    <strong>Damage:</strong> {selectedCar.damage?.toLocaleString() || "Call for milage"}
                                </div>
                            </div>

                            <div className="modal-description">
                                {selectedCar.description || "Experience exceptional performance and comfort with this premium vehicle."}
                            </div>

                            <button className="modal-contact-button">
                                Contact Dealer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GetPP;