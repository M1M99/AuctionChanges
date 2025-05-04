import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateModelForm() {
    const [makes, setMakes] = useState([]); // Markalarý tutacak
    const [models, setModels] = useState([]); // Modelleri tutacak
    const [selectedMakeId, setSelectedMakeId] = useState(''); // Seçilen marka id
    const [selectedModelId, setSelectedModelId] = useState(''); // Seçilen model id
    const [modelDetails, setModelDetails] = useState({
        id: 0,
        Name: '',
        Type: '',
        MakeId: 0,
    });

    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await axios.get('https://localhost:7038/api/Brand/GetAll');
                setMakes(response.data);
            } catch (error) {
                console.error('Error fetching makes:', error);
            }
        };
        fetchMakes();
    }, []);

    useEffect(() => {
        if (!selectedMakeId) return; 

        const fetchModels = async () => {
            try {
                const response = await axios.get(`https://localhost:7038/api/Model/GetModelByMake?makeId=${selectedMakeId}`);
                console.log("Fetched models: ", response.data); 
                setModels(response.data); 
                console.log(response,"Models")
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        fetchModels();
    }, [selectedMakeId]);

    useEffect(() => {
        if (!selectedModelId) return;

        const fetchModelDetails = async () => {
            try {
                const response = await axios.get(`https://localhost:7038/api/Model/GetById?id=${selectedModelId}`);
                const data = response.data;
                console.log(response)
                setModelDetails({
                    id: data.id,
                    Name: data.Name || '',
                    Type: data.Type || '',
                    MakeId: data.makeId || 0,
                });
            } catch (error) {
                console.error('Error fetching model details:', error);
            }
        };

        fetchModelDetails();
    }, [selectedModelId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModelDetails((prevModel) => ({
            ...prevModel,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const makeExists = makes.some((make) => make.id === modelDetails.MakeId);
        if (!makeExists) {
            alert("Selected MakeId is invalid.");
            console.log(makes)
            console.log(modelDetails)
        console.log(modelDetails.MakeId)
            return;
        }

        try {
            const response = await axios.put(
                'https://localhost:7038/api/Model',
                JSON.stringify(modelDetails),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log('Model updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating model:', error);
        }
    };


    return (
        <div>
            <h2>Update Model</h2>

            <select onChange={(e) => setSelectedMakeId(e.target.value)} value={selectedMakeId}>
                <option value="">Select Make</option>
                {makes.map((make) => (
                    <option key={make.id} value={make.id}>
                        {make.name}
                    </option>
                ))}
            </select>

            {selectedMakeId && (
                <select onChange={(e) => setSelectedModelId(e.target.value)} value={selectedModelId}>
                    <option value="">Select Model</option>
                    {models.length === 0 ? (
                        <option>No models available</option>
                    ) : (
                        models.map((modelOption) => (
                            <option key={modelOption.id} value={modelOption.id}>
                                {modelOption.name}
                            </option>
                        ))
                    )}
                </select>
            )}

            {selectedModelId && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-1"
                        name="Name"
                        onChange={handleChange}
                        value={modelDetails.Name}
                        placeholder="Model Name"
                    />
                    <input
                        className="form-control mb-1"
                        type="text"
                        name="Type"
                        onChange={handleChange}
                        value={modelDetails.Type}
                        placeholder="Model Type"
                    />
                    <button type="submit" className="btn btn-primary">Update Model</button>
                </form>
            )}
        </div>
    );
}

export default UpdateModelForm;
