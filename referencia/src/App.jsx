import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';
import AllEventsPage from './pages/AllEventsPage';
import MonthlyEventsPage from './pages/MonthlyEventsPage'; // Importa la nueva página

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/all-events" element={<AllEventsPage />} />
            <Route path="/monthly-events" element={<MonthlyEventsPage />} />
        </Routes>
    );
};
export default App;