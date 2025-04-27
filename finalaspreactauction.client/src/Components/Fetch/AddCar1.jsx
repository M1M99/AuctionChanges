import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import Fade from "react-bootstrap/esm/Fade";
import { Alert} from '@mui/material';

const AddCar1 = () => {
    const [formData, setFormData] = useState({
        branch: "",
        country: "",
        cylinder: "",
        damage: "",
        description: "",
        engine: "",
        fuelType: "",
        key: "",
        makeId: "",
        modelId: "",
        otometer: "",
        price: "",
        saleDocument: "",
        vin: "",
        year: "",
        video: null,
        photo: null,
    });
    //const [flag, setFlag] = useState(false);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const [responseMessage, setResponseMessage] = useState("");

    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await axios.get("https://localhost:7038/api/Brand/GetAll");
                setMakes(response.data);
            } catch (error) {
                console.error("Error fetching makes:", error);
            }
        };
        fetchMakes();
    }, []);

    useEffect(() => {
        const fetchModels = async () => {
            if (formData.makeId) {
                try {
                    const response = await axios.get(`https://localhost:7038/api/Model/GetModelByMake?makeId=${formData.makeId}`);
                    setModels(response.data);
                } catch (error) {
                    console.error("Error fetching models:", error);
                }
            }
        };
        fetchModels();
    }, [formData.makeId]);

    //const formFields = [
    //    { name: "branch", placeholder: "Branch" },
    //    { name: "country", placeholder: "Country" },
    //    { name: "cylinder", placeholder: "Cylinder" },
    //    { name: "damage", placeholder: "Damage" },
    //    { name: "description", placeholder: "Description" },
    //    { name: "engine", placeholder: "Engine" },
    //    { name: "fuelType", placeholder: "Fuel Type" },
    //    { name: "key", placeholder: "Key" },
    //    { name: "makeId", placeholder: "Make ID" },
    //    { name: "modelId", placeholder: "Model ID" },
    //    { name: "otometer", placeholder: "Odometer" },
    //    { name: "price", placeholder: "Price" },
    //    { name: "saleDocument", placeholder: "Sale Document" },
    //    { name: "vin", placeholder: "VIN" },
    //    { name: "year", placeholder: "Year" }
    //];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    };
    useEffect(() => {
        if (responseMessage) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth', 
            });
        }
    }, [responseMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post("https://localhost:7038/api/Car/AddNewCar", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setResponseMessage("Car added successfully!");
            console.log(response.data);
        } catch (error) {
            setResponseMessage("Error: " + error.message);
            console.error(error);
        }
    };

    return (
        <div className="m-1 bg-white">
            {/*<Button style={{ cursor: "pointer" }}*/}
            {/*    onClick={() => setFlag(!flag)}*/}
            {/*    aria-controls="example-fade-text"*/}
            {/*    aria-expanded={flag}*/}
            {/*>*/}
            {/*    {!flag ? "Add New Car" : "Cancel"}*/}
            {/*</Button>*/}
            {/*<Fade in={flag}>*/}
                <Form onSubmit={handleSubmit}>
                {makes && (
                    <Form.Group className="mb-3">
                        <Form.Label>Make</Form.Label>
                        <Form.Control
                            as="select"
                            name="makeId"
                            value={formData.makeId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Make</option>
                            {makes.map((make) => (
                                <option key={make.id} value={make.id}>
                                    {make.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                )}

                {models && formData.makeId && (
                    <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            as="select"
                            name="modelId"
                            value={formData.modelId}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Model</option>
                            {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                )}

                {['branch', 'country', 'cylinder', 'damage', 'description', 'engine', 'fuelType', 'key', 'otometer', 'price', 'saleDocument', 'vin', 'year'].map((field) => (
                    <Form.Group className="mb-3" key={field} style={{ padding: "0 5px" }}>
                        <Form.Label style={{ textTransform: "capitalize" }}>{field}</Form.Label>
                        <Form.Control
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            placeholder={field.charAt(0).toLocaleUpperCase() + field.slice(1)}
                        />
                    </Form.Group>
                ))}

                <Form.Group className="mb-3">
                    <Form.Label>Upload Video</Form.Label>
                    <Form.Control
                        type="file"
                        name="video"
                        onChange={handleFileChange}
                        accept="video/*"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Upload Photo</Form.Label>
                    <Form.Control
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Add Car
                </Button>
            </Form>
            {/*</Fade>*/}
            {responseMessage &&
                <Alert className="my-3" variant="filled" severity="success">
                    {responseMessage}
                </Alert>
            }
        </div>
    );
};

export default AddCar1;
