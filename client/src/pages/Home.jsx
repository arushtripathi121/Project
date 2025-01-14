import React from 'react';
import TravelForm from '../components/TravelForm';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-heading">AI-Powered Travel Planner</h1>
            <div className="travel-form-container">
                <TravelForm />
            </div>
        </div>
    );
};

export default Home;
