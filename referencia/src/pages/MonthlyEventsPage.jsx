import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MonthlyEventsPage = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const apiKey = 'TU_API_KEY'; // Reemplaza con tu API Key
        const calendarId = 'crypto-compass-458815-p2@group.calendar.google.com'; // Reemplaza con el ID de tu calendario
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`
        );
        const data = await response.json();

        // Filtrar eventos del mes actual
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyEvents = (data.items || []).filter((event) => {
            const eventDate = new Date(event.start.dateTime || event.start.date);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        setEvents(monthlyEvents);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Monthly Reserved Events
            </Typography>
            <List>
                {events.map((event) => (
                    <ListItem key={event.id}>
                        <ListItemText
                            primary={event.summary}
                            secondary={`Start: ${new Date(event.start.dateTime || event.start.date).toLocaleString()} | End: ${new Date(event.end.dateTime || event.end.date).toLocaleString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default MonthlyEventsPage;