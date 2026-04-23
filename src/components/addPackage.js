import React, { useState } from 'react';
import { addPackage, getPackages } from '../api';

function AddPackage() {
    const [formData, setFormData] = useState({
        packageName: '',
        packageCategory: 'General',
        classCount: '',
        classType: 'General',
        startDate: '',
        endDate: '',
        price: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            formData.classCount = parseInt(formData.classCount);
            formData.price = parseFloat(formData.price);
            const result = await addPackage(formData);
            setMessage(result.message || 'Package added successfully!');
            setFormData({
                packageName: '',
                packageCategory: 'General',
                classCount: '',
                classType: 'General',
                startDate: '',
                endDate: '',
                price: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add package');
        }
    };

    return (
        <div className="card">
            <h2>Add Package</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="packageName"
                    placeholder="Package Name"
                    value={formData.packageName}
                    onChange={handleChange}
                    required
                />
                <select name="packageCategory" value={formData.packageCategory} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Senior">Senior</option>
                </select>
                <input
                    type="number"
                    name="classCount"
                    placeholder="Class Count (1, 4, 10)"
                    value={formData.classCount}
                    onChange={handleChange}
                    required
                />
                <select name="classType" value={formData.classType} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Special">Special</option>
                </select>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Package</button>
            </form>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddPackage;