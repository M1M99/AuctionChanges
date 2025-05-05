import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios';

const Favorites = ({ userId }) => {
    const [favorites, setFavorites] = useState([]);
    const [carDetails, setCarDetails] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        //setFavorites([]);
        //setCarDetails([]);
        if (!userId) return;

        axios.get(`https://localhost:7038/api/Favorite/GetAll`, {
            params: { userId: userId }
        }).then((res) => {
            setFavorites(res.data);
        }).catch(err => console.error("Favoriler alýnamadý:", err));
    }, [userId]);

    useEffect(() => {
        if (favorites.length === 0) return;

        const fetchCars = async () => {
            try {
                const requests = favorites.map(fav =>
                    axios.get(`https://localhost:7038/api/Car/GetById`, {
                        params: { Id: fav.carId },
                    })
                );
                const responses = await Promise.all(requests);
                const cars = responses.map(res => res.data);
                console.log(cars)
                setCarDetails(cars);
            } catch (error) {
                console.error("Arabalar alýnýrken hata:", error);
            }
        };

        fetchCars();
    }, [favorites]);

    const handlePage = (carId) => {
        navigate(`/car/${carId}`)
    }
    
    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Favorite Cars</h1>

            {carDetails.length === 0 ? (
                <p className="text-gray-500 text-center">No favorite cars found.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {carDetails.map((car) => (
                            <li key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => handlePage(car.id)}>
                            <img src={car.imageUrl} alt="Car" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800">{car.make} {car.model}</h2>
                                <p className="text-sm text-gray-600">Year: {car.year}</p>
                                <p className="text-sm text-gray-600">Price: ${car.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;






//import { useEffect, useState } from "react";
//import { useNavigate } from "react-router";
//import axios from 'axios';
//import { useAuth } from "../Example/AuthContext";

//const Favorites = () => {
//    const [favorites, setFavorites] = useState([]);
//    const [carDetails, setCarDetails] = useState([]);
//    const { userId } = useAuth();

//    const navigate = useNavigate();
//    useEffect(() => {
//        if (!userId) return;

//        axios.get(`https://localhost:7038/api/Favorite/GetAll`, {
//            params: { userId: userId }
//        }).then((res) => {
//            setFavorites(res.data);
//        }).catch(err => console.error("Favoriler alýnamadý:", err));
//    }, [userId]);

//    useEffect(() => {
//        if (favorites.length === 0) return;

//        const fetchCars = async () => {
//            try {
//                const requests = favorites.map(fav =>
//                    axios.get(`https://localhost:7038/api/Car/GetById`, {
//                        params: { Id: fav.carId },
//                    })
//                );
//                const responses = await Promise.all(requests);
//                const cars = responses.map(res => res.data);
//                console.log(cars)
//                setCarDetails(cars);
//            } catch (error) {
//                console.error("Arabalar alýnýrken hata:", error);
//            }
//        };

//        fetchCars();
//    }, [favorites]);

//    const handlePage = (carId) => {
//        navigate(`/car/${carId}`)
//    }

//    return (
//        <div className="max-w-5xl mx-auto p-4">
//            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Favorite Cars</h1>

//            {carDetails.length === 0 ? (
//                <p className="text-gray-500 text-center">No favorite cars found.</p>
//            ) : (
//                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                    {carDetails.map((car) => (
//                        <li key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => handlePage(car.id)}>
//                            <img src={car.imageUrl} alt="Car" className="w-full h-48 object-cover" />
//                            <div className="p-4">
//                                <h2 className="text-xl font-semibold text-gray-800">{car.make} {car.model}</h2>
//                                <p className="text-sm text-gray-600">Year: {car.year}</p>
//                                <p className="text-sm text-gray-600">Price: ${car.price}</p>
//                            </div>
//                        </li>
//                    ))}
//                </ul>
//            )}
//        </div>
//    );
//};

//export default Favorites;
