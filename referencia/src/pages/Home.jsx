import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h4">Google Calendar App</Typography>
            <Button variant="contained" color="primary" component={Link} to="/calendar" style={{ marginTop: '20px' }}>
                Go to Calendar
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/all-events" style={{ marginTop: '20px', marginLeft: '10px' }}>
                View All Events
            </Button>
            <Button variant="contained" color="success" component={Link} to="/monthly-events" style={{ marginTop: '20px', marginLeft: '10px' }}>
                View Monthly Events
            </Button>
        </div>
    );
};

export default Home;