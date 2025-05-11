import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import Loading from './Loading';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UpdateCarForm from '../Admin/Update';
import { IconButton } from '@mui/material'; //Tooltip add here
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import BookmarkToggle from '../Example/Bookmark';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [search, setSearch] = useState('');
    const [userrole, setUserRole] = useState('');
    const navigate = useNavigate();
    const [carIdToUpdate, setCarIdToUpdate] = useState(null);
    const [selectedCarDetails, setSelectedCarDetails] = useState(null);
    const [openEditInput, setOpenEditInput] = useState(false)
    const [editBtn, setEditBtn] = useState(false);
    const [userId, setUserId] = useState("");

    const [visible, setVisible] = useState(false);


    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    //const token = localStorage.getItem("authToken");

    //useEffect(() => {
    //    const decoded = token ? jwtDecode(token) : null;
    //    if (decoded) {
    //        setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    //        setUserRole(decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    //    } else {
    //        navigate("/login");
    //    }
    //}, [token, navigate]);
    const update = (carId) => {
        setOpenEditInput(!openEditInput)
        setCarIdToUpdate(carId);
        const carToUpdate = cars.find(car => car.id === carId);
        setSelectedCarDetails(carToUpdate);
    }


    const carUrl = "https://localhost:7038/api/Car/Cars";
    const makeUrl = "https://localhost:7038/api/Brand/GetAll";
    const modelUrl = "https://localhost:7038/api/Model/GetAllModel";

    useEffect(() => {
        fetch(carUrl)
            .then((response) => response.json())
            .then((res) => {
                setCars(res);
            })
            .catch((error) => {
                console.error("Error fetching car data:", error);
                setCars([]);
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

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const userId1 = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                setUserRole(role);
                console.log(token)
                console.log(role)
                console.log(userId1)
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/#");
            }
        } else {
            navigate("/");
        }
    }, [navigate]);


    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            setUserId(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            setUserRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        } else {
            //navigate("/login");
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

    const filteredCars = cars.filter(car => {
        const vinMatch = car.vin.toLowerCase().includes(search.toLowerCase());
        const makeMatch = getMakeName(car.makeId).toLowerCase().includes(search.toLowerCase());
        const modelMatch = getModelName(car.modelId).toLowerCase().includes(search.toLowerCase());
        const yearMatch = car.year.toString().includes(search);

        const makeFilter = selectedMake === '' || car.makeId === parseInt(selectedMake);
        const modelFilter = selectedModel === '' || car.modelId === parseInt(selectedModel);

        return (vinMatch || makeMatch || modelMatch || yearMatch) && makeFilter && modelFilter;
    });

    const handleAction = (carId) => {
        axios.delete("https://localhost:7038/api/Car/DeleteById", {
            headers: null,
            params: { id: carId }
        })
            .then(() => {
                fetch(carUrl)
                    .then((response) => response.json())
                    .then((res) => {
                        setCars(res);
                    })
            })
    };

    const toggleVisibility = () => { console.log(visible); setVisible(!visible) };
    const editHandle = () => {
        setEditBtn(!editBtn);
    };

    const handleCarClick = (carId) => {
        navigate(`/car/${carId}`);
    };
    const Button = ({ label, arr, onSelect, selectedId }) => {
        const selectedItem = arr.find(item => item.id === parseInt(selectedId));
        const displayText = selectedItem ? selectedItem.name : `Select`;

        return (
            <StyledWrapper $visible={visible}>
                <div className="menu">
                    <div className="item">
                        <div className="link">
                            <span>{displayText}</span>
                            <svg viewBox="0 0 360 360" xmlSpace="preserve">
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        id="XMLID_225_"
                                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 
                                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 
                                    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="submenu">
                            <div className="submenu-item" onClick={() => onSelect('')}>
                                <span className="submenu-link">All {label}</span>
                            </div>
                            {arr.map((item) => (
                                <div
                                    key={item.id}
                                    className="submenu-item"
                                    onClick={() => onSelect(item.id)}
                                >
                                    <span className="submenu-link">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </StyledWrapper>
        );
    };


    return (
        <Container id="container" className="mb-3">
            <div className='inputDiv'>
                <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }} className="buttonDropdown">
                    <Button
                        label="Make"
                        arr={makes}
                        selectedId={selectedMake}
                        onSelect={setSelectedMake}
                    />

                    <Button
                        label="Model"
                        arr={models.filter(model => selectedMake === '' || model.makeId === parseInt(selectedMake))}
                        selectedId={selectedModel}
                        onSelect={setSelectedModel}
                    />
                </div>

                {userrole === "Admin" && (<FontAwesomeIcon icon={faPenToSquare} className="editForAdminIcon" onClick={() => { editHandle() }} />)}
                <FontAwesomeIcon
                    onClick={() => { toggleVisibility() }}
                    className="iconSearch"
                    style={{ display: "flex", width: "27px", height: "27px", margin: "auto 3px", cursor: "pointer" }}
                    icon={faFilter}
                />  <FontAwesomeIcon style={{ display: "flex", width: "30px", height: "30px", margin: "auto 3px" }} className="iconSearch" icon={faSearchengin} />
                <input
                    onChange={(ev) => setSearch(ev.target.value)}
                    value={search}
                    className='inputSeach'
                    type="text"
                    placeholder='Search'
                />
            </div>

            {cars.length === 0 ? (
                <Loading />
            ) : (
                    filteredCars.length === 0 ? (
                        <p style={{fontFamily:"Cascadia Code"} }>No Cars Found</p>
                ) : (
                    //filteredCars.map((car) => (
                    //    <div className="flex" key={car.id} id="listofcar">
                    //        <div id="imgCar" className="w-[250px]"><img src={car.imageUrl} alt={car.vin} onClick={() => handleCarClick(car.id)} style={{ cursor: 'pointer' }} /></div>
                    //        <div id="detailscars" className="w-xl flex justify-between">
                    //            <table className="table-auto m-2">
                    //                <thead>
                    //                    <tr>
                    //                        <th onClick={() => handleCarClick(car.id)} style={{ cursor: 'pointer' }}>Details </th>
                    //                    </tr>
                    //                </thead>
                    //                <tbody>
                    //                    <tr>
                    //                        <td>{getMakeName(car.makeId)}</td>
                    //                        <td>{getModelName(car.modelId)}</td>
                    //                        <td>{car.year}</td>
                    //                    </tr>
                    //                    <tr>
                    //                        <td><p id="damage">{car.damage}</p></td>
                    //                        <td><p id="typeofFuel">{car.fuelType}</p></td>
                    //                        <td>{car.otometer}</td>
                    //                    </tr>
                    //                    <tr>
                    //                        <td>{car.country}</td>
                    //                        <td>{car.vin}</td>
                    //                        <td>{car.engine}L</td>
                    //                        {userrole !== "Admin" && (
                    //                            <tr>
                    //                                <td colSpan="3">
                    //                                    <BookmarkToggle carId={car.id} userId={userId} />
                    //                                    {console.log(userId)}
                    //                                </td>
                    //                            </tr>)}
                    //                        {userrole === "Admin" && editBtn && (
                    //                            <div>
                    //                                <td id="edit" className="absolute right-50">
                    //                                    <Tooltip title="Edit">
                    //                                        <IconButton onClick={() => update(car.id)}>
                    //                                            <ModeEditIcon />
                    //                                        </IconButton>
                    //                                    </Tooltip>
                    //                                </td>
                    //                                <td id="delete" className="absolute right-10">
                    //                                    <Tooltip title="Delete">
                    //                                        <IconButton onClick={() => handleAction(car.id)}>
                    //                                            <DeleteIcon />
                    //                                        </IconButton>
                    //                                    </Tooltip>
                    //                                </td>
                    //                            </div>
                    //                        )}
                    //                    </tr>
                    //                </tbody>
                    //            </table>
                    //        </div>
                    //    </div>

                    <div className="w-full">
                        {filteredCars.map((car) => (
                            <div className="flex flex-col md:flex-row border-b border-gray-200 py-4 hover:bg-gray-510 transition-colors rounded" key={car.id} id="listofcar">
                                <div id="imgCar" className="w-full md:w-[250px] flex-shrink-0 mb-4 md:mb-0">
                                    <img
                                        src={car.imageUrl}
                                        alt={`${getMakeName(car.makeId)} ${getModelName(car.modelId)}`}
                                        onClick={() => handleCarClick(car.id)}
                                        className="w-full h-auto object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                                    />
                                </div>

                                <div id="detailscars" className="flex-grow px-4">
                                    <div className="flex flex-col">
                                        <div
                                            className="text-xl font-medium mb-3 cursor-pointer hover:text-blue-600 transition-colors"
                                            onClick={() => handleCarClick(car.id)}
                                        >
                                            {getMakeName(car.makeId)} {getModelName(car.modelId)} {car.year}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mb-3">
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm">Damage</span>
                                                <span id="damage" className="font-medium">{car.damage}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm">Fuel Type</span>
                                                <span id="typeofFuel" className="font-medium">{car.fuelType}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm">Odometer</span>
                                                <span className="font-medium">{car.otometer}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm">Country</span>
                                                <span className="font-medium">{car.country}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm">VIN</span>
                                                <span className="font-medium">{car.vin}</span>
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-gray-500 text-sm">Engine</span>
                                                <span className="font-medium">{car.engine}L</span>
                                            </div>
                                        </div>

                                        <div className="mt-2 flex justify-between items-center">
                                            {userrole !== "Admin" && (
                                                <div className="ml-auto">
                                                    <BookmarkToggle carId={car.id} userId={userId} />
                                                </div>
                                            )}

                                            {userrole === "Admin" && editBtn && (
                                                <div className="flex gap-2 ml-auto">
                                                    <button
                                                        id="edit"
                                                        onClick={() => update(car.id)}
                                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        aria-label="Edit"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        id="delete"
                                                        onClick={() => handleAction(car.id)}
                                                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                                                        aria-label="Delete"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            }
            
            {
                carIdToUpdate && selectedCarDetails && editBtn && openEditInput && (
                    <UpdateCarForm carId={carIdToUpdate} carDetails={selectedCarDetails} makes={makes} models={models} />
                )
            }
        </Container >
    );
};
const StyledWrapper = styled.div`
  display: ${props => props.$visible ? 'flex' : 'none'};
  .menu {
    font-size: 12px;
    line-height: 0.2;
    color: #000000;
    width: fit-content;
    display: flex;
  }

  .menu a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 36px;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0a3cff;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .link svg {
    width: 14px;
    height: 14px;
    fill: #000000;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .menu .item {
    position: relative;
    cursor:pointer
  }

  .menu .item .submenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    border-radius: 0 0 16px 16px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border: 1px solid #cccccc;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    pointer-events: none;
    list-style: none;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #000;

  &::-webkit-scrollbar {
    width: 1000px;
  }
  //&::-webkit-scrollbar-track {
  //  background: #f1f1f1;
  //}
  //&::-webkit-scrollbar-thumb {
  //  background: #888;
  //  border-radius: 6px;
  //}
  //&::-webkit-scrollbar-thumb:hover {
  //  background: #555;
  //}
  }

  .menu .item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
    border-top: transparent;
    border-color: #0a3cff;
  }

  .menu .item:hover .link {
    color: #ffffff;
    border-radius: 16px 16px 0 0;
  }

  .menu .item:hover .link::after {
    transform: scaleX(1);
    transform-origin: right;
  }

  .menu .item:hover .link svg {
    fill: #ffffff;
    transform: rotate(-180deg);
  }

  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link {
    display: block;
    padding: 12px 24px;
    width: 100%;
    position: relative;
    text-align: center;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-item:last-child .submenu-link {
    border-bottom: none;
  }

  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    background-color: #0a3cff;
    z-index: -1;
    transform-origin: left;
    transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .submenu .submenu-link:hover:before {
    transform: scaleX(1);
    transform-origin: right;
  }

  .submenu .submenu-link:hover {
    color: #ffffff;
  }`;
const Container = styled.div`
    margin: 0 10px;
    padding: 0 10px;
    padding-bottom: 10px;
    border-radius: 3px;
    background-color: #6a9eb5;
    background:linear-gradient(to bottom right, #8ecae6, #219ebc); //ffb703
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.25);
      &:hover {
    background:linear-gradient(to bottom right, #8ecae6, #219ebc); //ffb703
        box-shadow: 0px 6px 12px rgba(0, 0, 0.4, 0.4); 
    }
`;

export default CarList;
