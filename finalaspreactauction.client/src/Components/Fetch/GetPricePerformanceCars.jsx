import axios from "axios";
import { useState, useEffect } from "react";
import Footer from "../Example/Example11";
import Card from "../Example/Card";
import { useNavigate } from "react-router";
const GetPP = () => {
    const [cars, setCars] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const makeUrl = "https://localhost:7038/api/Brand/GetAll";
    const modelUrl = "https://localhost:7038/api/Model/GetAllModel";
    const navigate = useNavigate();
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getMakeName = (makeId) => {
        const make = makes.find(m => m.id === makeId);
        return make ? make.name : "Unknown Make";
    };

    const getModelName = (modelId) => {
        const model = models.find(m => m.id === modelId);
        return model ? model.name : "Unknown Model";
    };

    return (
        <div>
            <h3>Best Top {cars.length} Cars</h3>
            <div className="cards-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {cars.map((car) => (
                    <Card
                        key={car.id}
                        car={car}
                        getMakeName={getMakeName}
                        getModelName={getModelName}
                        navigate
                    />
                ))}
            </div>
        </div>
    );
};

export default GetPP;
