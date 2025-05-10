import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
/* global google */ // Sirve para evitar que ESLint detecte el error de google no definido
const CLIENT_ID = '697184002533-m9vcjp6t25d2toqshakr0kppf6tfbaem.apps.googleusercontent.com'; // Client ID

const CALENDAR_ID = '4c24f0397b403ea724ab3cb62d234645f18cf133a510b817541bef402f8c2f1c@group.calendar.google.com'; // ID del calendario
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const API_KEY = 'AIzaSyA5rXHOkLc8f--iMQDKWVN-ws12O35e-ww'; 

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const initializeGIS = () => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: (response) => {
                    if (response.access_token) {
                        setToken(response.access_token);
                        setIsSignedIn(true);
                        fetchEvents(response.access_token);
                    } else {
                        console.error('Error al obtener el token de acceso:', response);
                    }
                },
            });

            const button = document.getElementById('signin-button');
            button.onclick = () => client.requestAccessToken();
        };

        initializeGIS();
    }, []);

    const fetchEvents = async (accessToken) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`Error al obtener eventos: ${response.statusText}`);
            }
            const data = await response.json();
            setEvents(data.items || []);
        } catch (error) {
            console.error('Error en fetchEvents:', error);
        }
    };

    const addEvent = async (newEvent) => {
        try {
            // Validar que el evento tenga los campos requeridos
            if (!newEvent.summary || !newEvent.start || !newEvent.end) {
                throw new Error('El evento debe tener un resumen, una hora de inicio y una hora de fin.');
            }

            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(newEvent),
                }
            );

            if (response.ok) {
                const createdEvent = await response.json();
                console.log('Evento creado:', createdEvent);
                setEvents((prevEvents) => [...prevEvents, createdEvent]);
            } else {
                const errorData = await response.json();
                console.error('Error al agregar el evento:', errorData);
                throw new Error(`Error al agregar el evento: ${errorData.error.message}`);
            }
        } catch (error) {
            console.error('Error en addEvent:', error);
        }
    };

    return (
        <div>
            <h1>Calendario Público</h1>
            {isSignedIn ? (
                <>
                    <button onClick={() => setIsSignedIn(false)}>Cerrar sesión</button>
                    <EventForm onSubmit={addEvent} />
                    <EventList events={events} />
                </>
            ) : (
                <button id="signin-button">Iniciar sesión con Google</button>
            )}
        </div>
    );
};

export default CalendarPage;