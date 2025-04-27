import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Fetch/Loading';
import UpdateCarForm from '../Admin/Update';
import BookmarkToggle from '../Example/Bookmark';

const CarList22 = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [search, setSearch] = useState('');
    const [userrole, setUserRole] = useState('');
    const [carIdToUpdate, setCarIdToUpdate] = useState(null);
    const [selectedCarDetails, setSelectedCarDetails] = useState(null);
    const [openEditInput, setOpenEditInput] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const navigate = useNavigate();

    const API_BASE_URL = "https://localhost:7038/api";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [carsRes, makesRes, modelsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/Car/Cars`),
                    fetch(`${API_BASE_URL}/Brand/GetAll`),
                    fetch(`${API_BASE_URL}/Model/GetAllModel`)
                ]);

                const [carsData, makesData, modelsData] = await Promise.all([
                    carsRes.json(),
                    makesRes.json(),
                    modelsRes.json()
                ]);

                setCars(carsData);
                setMakes(makesData);
                setModels(modelsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCars([]);
                setMakes([]);
                setModels([]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                setUserRole(role);
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);

    const getMakeName = (makeId) => {
        const make = makes.find(m => m.id === makeId);
        return make ? make.name : "Unknown Make";
    };

    const getModelName = (modelId) => {
        const model = models.find(m => m.id === modelId);
        return model ? model.name : "Unknown Model";
    };

    const filteredCars = cars.filter(car =>
        car.vin.toLowerCase().includes(search.toLowerCase()) ||
        getMakeName(car.makeId).toLowerCase().includes(search.toLowerCase()) ||
        getModelName(car.modelId).toLowerCase().includes(search.toLowerCase()) ||
        car.year.toString().includes(search)
    );

    const handleDelete = async (carId) => {
        try {
            await axios.delete(`${API_BASE_URL}/Car/DeleteById`, {
                params: { id: carId }
            });
            const response = await fetch(`${API_BASE_URL}/Car/Cars`);
            const updatedCars = await response.json();
            setCars(updatedCars);
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleUpdate = (carId) => {
        setOpenEditInput(!openEditInput);
        setCarIdToUpdate(carId);
        const carToUpdate = cars.find(car => car.id === carId);
        setSelectedCarDetails(carToUpdate);
    };

    const handleCarClick = (carId) => {
        navigate(`/car/${carId}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center bg-white rounded-lg shadow-sm p-4 mb-8">
                {userrole === "Admin" && (
                    <button
                        onClick={() => setEditBtn(!editBtn)}
                        className="mr-4 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="w-6 h-6" />
                    </button>
                )}
                <FontAwesomeIcon icon={faSearchengin} className="w-6 h-6 text-gray-500 mr-3" />
                <input
                    type="text"
                    placeholder="Search cars..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 outline-none text-gray-700"
                />
            </div>

            {cars.length === 0 ? (
                <Loading />
            ) : filteredCars.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No cars found matching your search</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                        <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <img
                                src={car.imageUrl}
                                alt={`${getMakeName(car.makeId)} ${getModelName(car.modelId)}`}
                                className="w-full h-48 object-cover cursor-pointer"
                                onClick={() => handleCarClick(car.id)}
                            />
                            <div className="p-4">
                                <h3
                                    className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer"
                                    onClick={() => handleCarClick(car.id)}
                                >
                                    {getMakeName(car.makeId)} {getModelName(car.modelId)} {car.year}
                                </h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <p><span className="font-medium">Damage:</span> {car.damage}</p>
                                    <p><span className="font-medium">Fuel:</span> {car.fuelType}</p>
                                    <p><span className="font-medium">Mileage:</span> {car.otometer}</p>
                                    <p><span className="font-medium">Location:</span> {car.country}</p>
                                    <p><span className="font-medium">VIN:</span> {car.vin}</p>
                                    <p><span className="font-medium">Engine:</span> {car.engine}L</p>
                                </div>

                                {userrole !== "Admin" && (
                                    <div className="mt-4">
                                        <BookmarkToggle />
                                    </div>
                                )}

                                {userrole === "Admin" && editBtn && (
                                    <div className="flex justify-end mt-4 space-x-2">
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => handleUpdate(car.id)}>
                                                <ModeEditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(car.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {carIdToUpdate && selectedCarDetails && editBtn && openEditInput && (
                <UpdateCarForm
                    carId={carIdToUpdate}
                    carDetails={selectedCarDetails}
                    makes={makes}
                    models={models}
                />
            )}
        </div>
    );
};

export default CarList22;