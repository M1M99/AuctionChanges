import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, Car, Upload, FileVideo, Save, RefreshCw } from 'lucide-react';
function UpdateCarForm({ carId, carDetails, makes, models }) {
    const [car, setCar] = useState({
        id: carId,
        Branch: '',
        Country: '',
        Cylinder: '',
        Damage: '',
        Description: '',
        Engine: '',
        FuelType: '',
        Key: '',
        MakeId: 0,
        ModelId: 0,
        Otometer: '',
        Price: '',
        SaleDocument: '',
        Vin: '',
        Year: '',
        photo: null,
        video: null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (carDetails && carDetails.id === carId) {
            setCar(prev => ({ ...prev, ...carDetails }));
        }
    }, [carDetails, carId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files[0]) {
            setCar(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleReset = () => {
        if (carDetails) {
            setCar(prev => ({ ...prev, ...carDetails }));
        } else {
            setCar({
                id: carId,
                Branch: '',
                Country: '',
                Cylinder: '',
                Damage: '',
                Description: '',
                Engine: '',
                FuelType: '',
                Key: '',
                MakeId: 0,
                ModelId: 0,
                Otometer: '',
                Price: '',
                SaleDocument: '',
                Vin: '',
                Year: '',
                photo: null,
                video: null,
            });
        }
        setError('');
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const formData = new FormData();
        Object.entries(car).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        try {
            const response = await axios.put('https://localhost:7038/api/Car', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess(true);
            console.log('Car updated successfully:', response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating car');
            console.error('Error updating car:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5 bg-white rounded-xl shadow-lg my-2">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Car className="w-6 h-6" />
                    Update Car Details
                </h2>
                <p className="text-gray-600">Update the information for your vehicle listing</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                    <Save className="w-5 h-5" />
                    Car details updated successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-2">Basic Information</h3>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Make</label>
                            <select
                                name="MakeId"
                                value={car.MakeId}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value={0}>Select a Make</option>
                                {makes?.map((make) => (
                                    <option key={make.id} value={make.id}>
                                        {make.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Model</label>
                            <select
                                name="ModelId"
                                value={car.ModelId}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value={0}>Select a Model</option>
                                {models?.map((model) => (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {[
                            { name: 'Year', placeholder: 'Enter year' },
                            { name: 'Price', placeholder: 'Enter price' },
                            { name: 'Vin', placeholder: 'Enter VIN number' },
                        ].map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.name}
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={car[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-700 border-b pb-2">Technical Details</h3>

                        {[
                            { name: 'Engine', placeholder: 'Enter engine details' },
                            { name: 'Cylinder', placeholder: 'Enter cylinder count' },
                            { name: 'FuelType', placeholder: 'Enter fuel type' },
                            { name: 'Otometer', placeholder: 'Enter odometer reading' },
                            { name: 'Damage', placeholder: 'Enter damage details' },
                        ].map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.name}
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={car[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Additional Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { name: 'Branch', placeholder: 'Enter branch' },
                            { name: 'Country', placeholder: 'Enter country' },
                            { name: 'Key', placeholder: 'Enter key details' },
                            { name: 'SaleDocument', placeholder: 'Enter sale document details' },
                        ].map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.name}
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={car[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="Description"
                            value={car.Description}
                            onChange={handleChange}
                            placeholder="Enter detailed description"
                            rows={4}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold text-gray-700 border-b pb-2">Media</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                            <div className="flex items-center gap-2">
                                <Upload className="w-5 h-5 text-gray-400" />
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Video</label>
                            <div className="flex items-center gap-2">
                                <FileVideo className="w-5 h-5 text-gray-400" />
                                <input
                                    type="file"
                                    name="video"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Reset
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-600 rounded-lg
              ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Updating...' : 'Update Car'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateCarForm;