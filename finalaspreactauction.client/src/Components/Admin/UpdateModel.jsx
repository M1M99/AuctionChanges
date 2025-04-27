import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateModelForm({ modelId, modelDetails }) {
    const [model, setModel] = useState({
        id: modelId,
        Name: '',
        Type: '',
        MakeId: 0,
    });

    useEffect(() => {
        if (modelDetails && modelDetails.id === modelId) {
            setModel({
                id: modelId,
                Type: modelDetails.Type || '',
                Name: modelDetails.Name || '',
                MakeId: modelDetails.makeId || 0,
            });
        }
    }, [modelDetails, modelId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModel((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(model).forEach((key) => {
            if (model[key] !== undefined && model[key] !== null) {
                formData.append(key, model[key]);
            }
        });

        try {
            const response = await axios.put('https://localhost:7038/api/Model', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Car updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    return (
        <div>
            <h2>Update Model</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="Id"
                    value={modelId}
                    onChange={handleChange}
                    placeholder="Id"
                />
                <input
                    type="text"
                    name="Name"
                    onChange={handleChange}
                    value={model.Name}
                    placeholder="Name"
                />
                <input
                    type="text"
                    onChange={handleChange}
                    name="Type"
                    value={model.Type}
                    placeholder="Type"
                />
                <input
                    type="number"
                    name="makeId"
                    onChange={handleChange}
                    value={model.makeId || ''}
                    placeholder="makeId"
                />
                <button type="submit">Update Model</button>
            </form>

        </div>
    );
}

export default UpdateModelForm;