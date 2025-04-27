import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateMakeForm({ makeId, makeDetails }) {
    const [make, setMake] = useState({
        id: makeId,
        Description: '',
        Name: '',
    });

    useEffect(() => {
        if (makeDetails && makeDetails.id === makeId) {
            setMake({
                id: makeId,
                Description: makeDetails.Description || '',
                Name: makeDetails.Name || '',
            });
        }
    }, [makeDetails, makeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMake((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(make).forEach((key) => {
            if (make[key] !== undefined && make[key] !== null) {
                formData.append(key, make[key]);
            }
        });

        try {
            const response = await axios.put('https://localhost:7038/api/Brand/EditMake', formData, {
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
            <h2>Update Car</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="Id"
                    value={makeId}
                    onChange={handleChange}
                    placeholder="Id"
                />
                <input
                    type="text"
                    name="Name"
                    onChange={handleChange}
                    value={make.Name}
                    placeholder="Name"
                />
                <input
                    type="text"
                    onChange={handleChange}
                    name="Description"
                    value={make.Description}
                    placeholder="Description"
                />
                <button type="submit">Update Make</button>
            </form>

        </div>
    );
}

export default UpdateMakeForm;