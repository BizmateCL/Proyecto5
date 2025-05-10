import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const EventForm = ({ onSubmit }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const startDateTime = new Date(eventDate);
        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Agrega 1 hora al inicio

        const newEvent = {
            summary: eventTitle,
            start: {
                dateTime: startDateTime.toISOString(),
            },
            end: {
                dateTime: endDateTime.toISOString(),
            },
            description: eventDescription,
        };
        onSubmit(newEvent);
        setEventTitle('');
        setEventDate('');
        setEventDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add New Event</Typography>
            <TextField
                label="Event Title"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                fullWidth
                required
                sx={{ marginBottom: 2 }} // Agrega margen inferior
            />
            <TextField
                label="Event Date and Time"
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                    shrink: true, // evitar traspapamiento de textos, mantiene texto en la parte su
                }}
                sx={{ marginBottom: 2 }} // Agrega margen inferior
            />
            <TextField
                label="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={{ marginBottom: 2 }} // Agrega margen inferior
            />
            <Button type="submit" variant="contained" color="primary">
                Add Event
            </Button>
        </form>
    );
};

export default EventForm;