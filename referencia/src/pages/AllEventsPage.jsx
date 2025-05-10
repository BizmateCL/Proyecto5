import React, { useEffect, useState } from 'react';

const CALENDAR_ID = 'lateral-rider-458918-v9@group.calendar.googleusercontent.com'; // Replace with your Calendar ID
const API_KEY = 'AIzaSyA5rXHOkLc8f--iMQDKWVN-ws12O35e-ww'; // Replace with your API Key

const AllEventsPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Error fetching events: ${response.statusText}`);
                }
                const data = await response.json();
                setEvents(data.items || []);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchAllEvents();
    }, []);

    return (
        <div>
            <h1>All Events</h1>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <strong>{event.summary}</strong>
                            <p>
                                {event.start?.dateTime || event.start?.date} - {event.end?.dateTime || event.end?.date}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default AllEventsPage;