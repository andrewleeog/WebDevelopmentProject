import React, {useState} from 'react';
import {addClass, getClasses, getInstructors} from '../api';

function AddClass() {
    const [formData, setFormData] = useState({
        instructorId: '', day: '', time: '', classType: 'General', payRate: ''
    });
    const [instructors, setInstructors] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            formData.payRate = parseInt(formData.payRate);
            const result = await addClass(formData);
            setMessage(result.message || 'Class added successfully!');
            setFormData({ instructorId: '', day: '', time: '', classType: 'General', payRate: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add class');
        }
    };

    return (
        <div className="card">
            <h2>Add Class</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="instructorId" placeholder="Instructor ID" value={formData.instructorId} onChange={handleChange} required />
                <input type="text" name="day" placeholder="Day (e.g. Monday)" value={formData.day} onChange={handleChange} required />
                <input type="text" name="time" placeholder="Time (e.g. 9am)" value={formData.time} onChange={handleChange} required />
                <select name="classType" value={formData.classType} onChange={handleChange}>
                    <option value="General">General</option>
                    <option value="Special">Special</option>
                </select>
                <input type="number" name="payRate" placeholder="Pay Rate" value={formData.payRate} onChange={handleChange} required />
                <button type="submit">Add Class</button>
            </form>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddClass;