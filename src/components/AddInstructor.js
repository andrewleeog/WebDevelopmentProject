import React, {useState} from 'react';
import {addInstructor, getInstructors} from '../api';

function AddInstructor() {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', address: '', phone: '', email: '', preferredContact: 'email'
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
            const result = await addInstructor(formData);
            setMessage(result.notification || 'Instructor added successfully!');
            setFormData({ firstName: '', lastName: '', address: '', phone: '', email: '', preferredContact: 'email' });
        } catch (error) {
            setError(error.response?.data?.message || 'failed to add instructor');
        }
    };

    return (
        <div className="card">
            <h2>Add Instructor</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <select name="preferredContact" value={formData.preferredContact} onChange={handleChange}>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                <button type="submit">Add Instructor</button>
            </form>
            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default AddInstructor;