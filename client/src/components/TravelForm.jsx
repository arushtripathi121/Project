import React, { useState } from 'react';
import axios from 'axios';

const TravelForm = () => {
    const [formData, setFormData] = useState({
        destination: '',
        budget: '',
        time: '',
        interests: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/travel/preferences', formData);
        alert('Preferences saved!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="destination" placeholder="Destination" onChange={handleChange} />
            <input type="number" name="budget" placeholder="Budget" onChange={handleChange} />
            <input type="text" name="time" placeholder="Duration (e.g., 3 days)" onChange={handleChange} />
            <input type="text" name="interests" placeholder="Interests (e.g., beaches, hiking)" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TravelForm;
