import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./../Page/Header";
import GetPP from "./GetPricePerformanceCars";
import { useNavigate } from 'react-router-dom';

const GetCarByMake = () => {
    const { id } = useParams();
    const [cars, setCars] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!id) {
            setError("No makeId provided");
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const brandResponse = await axios.get(`https://localhost:7038/api/Brand/GetById?id=${id}`);
                setBrandName(brandResponse.data.name);

                const carsResponse = await axios.get(`https://localhost:7038/api/Car/GetByBrandId?id=${id}`);
                setCars(carsResponse.data);
            } catch (err) {
                setError("Failed to fetch data");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);
    const navigate = useNavigate();

    const handleCarClick = (carId) => {
        navigate(`/car/${carId}`)
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading cars...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-red-600 text-lg mb-2">Error</p>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-2 bg-gray-60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {cars.length === 0 ? (
                    <GetPP />
                ) : (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            {brandName || "Loading brand name..."}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                                >
                                    <div className="aspect-w-16 aspect-h-9" onClick={() => { handleCarClick(car.id) }}>
                                        <img
                                            src={car.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
                                            alt={`${brandName} ${car.id}`}
                                            className="w-full h-48 object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                                            }}
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {brandName} - {car.id}
                                        </h3>
                                        <div className="space-y-2">
                                            <p className="text-gray-600">
                                                <span className="font-medium">Year:</span> {car.year}
                                            </p>
                                            {car.price && (
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Price:</span> ${car.price.toLocaleString()}
                                                </p>
                                            )}
                                            {car.mileage && (
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Mileage:</span> {car.mileage.toLocaleString()} miles
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetCarByMake;