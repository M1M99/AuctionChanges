import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Example() {
    const [cars, setCars] = useState([]);  
    const [totalCars, setTotalCars] = useState(0); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [carsPerPage, setCarsPerPage] = useState(2); 

    const fetchCars = async () => {
        try {
            const response = await axios.get(`https://localhost:7038/api/Car/ForPagination?page=${currentPage}&count=${carsPerPage}`);
            console.log(response)
            setCars(response.data.cars);
            setTotalCars(response.data.totalCount); 
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage * carsPerPage < totalCars) {
            setCurrentPage(currentPage + 1); 
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const totalPages = Math.ceil(isNaN(totalCars) ? 0 : totalCars / carsPerPage);

    return (
        <div>
            <div className="flex justify-between flex-wrap">
                {cars.map((car) => (
                    <div key={car.id} className="p-4 border rounded-lg">
                        <img src={car.imageUrl} alt="Car" className="w-full h-48 object-cover" />
                        <h3 className="text-lg font-semibold">{car.title}</h3>
                        <p>{car.department}</p>
                        <p>{car.type}</p>
                        <p>{car.location}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={handlePrevPage}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(currentPage - 1) * carsPerPage + 1}</span> to{" "}
                            <span className="font-medium">{Math.min(currentPage * carsPerPage, totalCars)}</span> of{" "}
                            <span className="font-medium">{totalCars}</span> results
                        </p>
                    </div>
                    <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                            <button
                                onClick={handlePrevPage}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === index + 1 ? "bg-indigo-600 text-white" : ""}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={handleNextPage}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
