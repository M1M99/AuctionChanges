import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from '../Fetch/Loading';
import { Pagination } from 'antd';
import styled from 'styled-components';

function ForAdmin() {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [userrole, setUserRole] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const navigate = useNavigate();

    const carUrl = "https://localhost:7038/api/Car/Cars";
    const makeUrl = "https://localhost:7038/api/Brand/GetAll";
    const modelUrl = "https://localhost:7038/api/Model/GetAllModel";
    const StyledWrapper = styled.div`
  .button {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: rgb(0 107 179);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 15px;
    cursor: pointer;
  }

  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }

  .button:hover .icon {
    transform: translate(4px);
  }

  .button:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  .button::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }

    60% {
      left: 100%;
    }

    to {
      left: 100%;
    }
  }`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [carRes, makeRes, modelRes] = await Promise.all([
                    fetch(carUrl).then(r => r.json()),
                    fetch(makeUrl).then(r => r.json()),
                    fetch(modelUrl).then(r => r.json())
                ]);
                setCars(carRes);
                setMakes(makeRes);
                setModels(modelRes);
            } catch (error) {
                console.error("Fetching error:", error);
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
                console.error("Token error:", error);
                navigate("/#");
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

    const handleDelete = async (carId) => {
        try {
            await axios.delete("https://localhost:7038/api/Car/DeleteById", {
                params: { id: carId }
            });
            const updatedCars = await fetch(carUrl).then(r => r.json());
            setCars(updatedCars);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <header>
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Car Collection</h2>
                    <p className="mt-4 max-w-md text-gray-500">
                        Here is a list of available cars. Admins can delete or edit car data.
                    </p>
                </header>

                {cars.length === 0 ? (
                    <Loading />
                ) : (
                    <>
                        <Container className="mt-6">
                            <Row>
                                {currentCars.map((res) => (
                                    <Col key={res.id} sm={12} md={6} lg={4} className="mb-4">
                                        <div className="bg-white shadow rounded-lg overflow-hidden">
                                            <img
                                                src={res.imageUrl}
                                                alt={res.modelName}
                                                className="w-full h-64 object-cover cursor-pointer"
                                            />
                                            <div className="p-4">
                                                <h5 className="text-lg font-semibold">
                                                    {getMakeName(res.makeId)} - {getModelName(res.modelId)}
                                                </h5>
                                                <p className="text-sm text-gray-600">Year: {res.year}</p>
                                                <p className="text-sm text-gray-600">Country: {res.country}</p>
                                                <p className="text-sm text-gray-600">Fuel: {res.fuelType}</p>
                                                {userrole === "Admin" && (
                                                    <div className="mt-3 flex gap-2" style={{justifyContent:"center"} }>
                                                        <StyledWrapper>
                                                            <button className="button" onClick={() => handleDelete(res.id)}>
                                                                Delete
                                                                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </StyledWrapper>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Container>

                        <div className="flex justify-center mt-6">
                            <Pagination
                                current={currentPage}
                                pageSize={itemsPerPage}
                                total={cars.length}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default ForAdmin;
