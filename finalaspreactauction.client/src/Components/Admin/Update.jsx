import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, Space } from 'antd';
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

    useEffect(() => {
        if (carDetails && carDetails.id === carId) {
            setCar({
                id: carId,
                Branch: carDetails.Branch || '',
                Country: carDetails.Country || '',
                Cylinder: carDetails.Cylinder || '',
                Damage: carDetails.Damage || '',
                Description: carDetails.Description || '',
                Engine: carDetails.Engine || '',
                FuelType: carDetails.FuelType || '',
                Key: carDetails.Key || '',
                MakeId: carDetails.MakeId || 0,
                ModelId: carDetails.ModelId || 0,
                Otometer: carDetails.Otometer || '',
                Price: carDetails.Price || '',
                SaleDocument: carDetails.SaleDocument || '',
                Vin: carDetails.Vin || '',
                Year: carDetails.Year || '',
                photo: null,
                video: null,
            });
        }
    }, [carDetails, carId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prevCar) => ({
            ...prevCar,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'photo') {
            setCar((prevCar) => ({
                ...prevCar,
                photo: files[0],
            }));
        } else if (name === 'video') {
            setCar((prevCar) => ({
                ...prevCar,
                video: files[0],
            }));
        }
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();

        const formData = new FormData();

        Object.keys(car).forEach((key) => {
            if (car[key] !== undefined && car[key] !== null) {
                formData.append(key, car[key]);
            }
        });

        try {
            const response = await axios.put('https://localhost:7038/api/Car', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Car updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    const { Option } = Select;
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [form] = Form.useForm();

    return (
        <Form
            {...layout}
            form={form}
            name="update-car-form"
            onFinish={handleSubmit}
            style={{ maxWidth: 600 }}
        >
            <Form.Item
                name="SaleDocument"
                label="Sale Document"
                rules={[{ required: true, message: 'Please input the sale document!' }]}
            >
                <Input
                    name="SaleDocument"
                    value={car.SaleDocument}
                    onChange={handleChange}
                    placeholder="Sale Document"
                />
            </Form.Item>

            <Form.Item
                name="Branch"
                label="Branch"
                rules={[{ required: true, message: 'Please input the branch!' }]}
            >
                <Input
                    name="Branch"
                    value={car.Branch}
                    onChange={handleChange}
                    placeholder="Branch"
                />
            </Form.Item>

            <Form.Item
                name="Otometer"
                label="Otometer"
                rules={[{ required: true, message: 'Please input the otometer!' }]}
            >
                <Input
                    name="Otometer"
                    value={car.Otometer}
                    onChange={handleChange}
                    placeholder="Otometer"
                />
            </Form.Item>

            <Form.Item
                name="Year"
                label="Year"
                rules={[{ required: true, message: 'Please input the year!' }]}
            >
                <Input
                    name="Year"
                    value={car.Year}
                    onChange={handleChange}
                    placeholder="Year"
                />
            </Form.Item>

            <Form.Item
                name="Vin"
                label="Vin"
                rules={[{ required: true, message: 'Please input the vin!' }]}
            >
                <Input
                    name="Vin"
                    value={car.Vin}
                    onChange={handleChange}
                    placeholder="Vin"
                />
            </Form.Item>

            <Form.Item
                name="Price"
                label="Price"
                rules={[{ required: true, message: 'Please input the price!' }]}
            >
                <Input
                    name="Price"
                    value={car.Price}
                    onChange={handleChange}
                    placeholder="Price"
                />
            </Form.Item>

            <Form.Item
                name="Key"
                label="Key"
                rules={[{ required: true, message: 'Please input the key!' }]}
            >
                <Input
                    name="Key"
                    value={car.Key}
                    onChange={handleChange}
                    placeholder="Key"
                />
            </Form.Item>

            <Form.Item
                name="FuelType"
                label="FuelType"
                rules={[{ required: true, message: 'Please input the fuel type!' }]}
            >
                <Input
                    name="FuelType"
                    value={car.FuelType}
                    onChange={handleChange}
                    placeholder="FuelType"
                />
            </Form.Item>

            <Form.Item
                name="Country"
                label="Country"
                rules={[{ required: true, message: 'Please input the country!' }]}
            >
                <Input
                    name="Country"
                    value={car.Country}
                    onChange={handleChange}
                    placeholder="Country"
                />
            </Form.Item>

            <Form.Item
                name="Cylinder"
                label="Cylinder"
                rules={[{ required: true, message: 'Please input the cylinder!' }]}
            >
                <Input
                    name="Cylinder"
                    value={car.Cylinder}
                    onChange={handleChange}
                    placeholder="Cylinder"
                />
            </Form.Item>

            <Form.Item
                name="Damage"
                label="Damage"
                rules={[{ required: true, message: 'Please input the damage!' }]}
            >
                <Input
                    name="Damage"
                    value={car.Damage}
                    onChange={handleChange}
                    placeholder="Damage"
                />
            </Form.Item>

            <Form.Item
                name="Description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input
                    name="Description"
                    value={car.Description}
                    onChange={handleChange}
                    placeholder="Description"
                />
            </Form.Item>

            <Form.Item
                name="Engine"
                label="Engine"
                rules={[{ required: true, message: 'Please input the engine!' }]}
            >
                <Input
                    name="Engine"
                    value={car.Engine}
                    onChange={handleChange}
                    placeholder="Engine"
                />
            </Form.Item>

            <Form.Item name="MakeId" label="Make" rules={[{ required: true }]}>
                <Select
                    name="MakeId"
                    value={car.MakeId}
                    onChange={(value) => handleChange({ target: { name: 'MakeId', value } })}
                    placeholder="Select a make"
                    allowClear
                >
                    <Option value={0}>Select a Make</Option>
                    {makes.map((make) => (
                        <Option key={make.id} value={make.id}>
                            {make.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="ModelId" label="Model" rules={[{ required: true }]}>
                <Select
                    name="ModelId"
                    value={car.ModelId}
                    onChange={(value) => handleChange({ target: { name: 'ModelId', value } })}
                    placeholder="Select a model"
                    allowClear
                >
                    <Option value={0}>Select a Model</Option>
                    {models.map((model) => (
                        <Option key={model.id} value={model.id}>
                            {model.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="photo" label="Upload Photo">
                <input type="file" name="photo" onChange={handleFileChange} />
            </Form.Item>

            <Form.Item name="video" label="Upload Video">
                <input type="file" name="video" onChange={handleFileChange} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button">
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default UpdateCarForm;
