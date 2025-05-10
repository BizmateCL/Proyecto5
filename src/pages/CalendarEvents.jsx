
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

/* global google */
const CLIENT_ID = import.meta.env.CLIENT_ID;//Variavbles sin VITE, se manejan en backend, y no debe exponerse en navegador
const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID;//Variables con VITE_ no se exponen al cliente, y solo estan disponibles en entorno del servidor.
const API_KEY = import.meta.env.VITE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly';

const CalendarEvents = () => {
    const [events, setEvents] = useState([]);
    const [token, setToken] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado
    const [showPopup, setShowPopup] = useState(false); // Controla la visibilidad del popup
    const [view, setView] = useState('month'); // Estado para la vista del calendario
    const [currentDate, setCurrentDate] = useState(new Date()); // Estado para la fecha actual

    const localizer = momentLocalizer(moment);

    useEffect(() => {
        const savedToken = localStorage.getItem('google_token');
        if (savedToken) {
            setToken(savedToken);
            fetchEvents(savedToken);
        } else {
            initializeGIS();
        }
    }, []);

    const initializeGIS = () => {
        const client = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (response) => {
                if (response.access_token) {
                    setToken(response.access_token);
                    localStorage.setItem('google_token', response.access_token);
                    fetchEvents(response.access_token);
                } else {
                    console.error('Error al obtener el token de acceso:', response);
                }
            },
        });

        const button = document.getElementById('signin-button');
        if (button) {
            button.onclick = () => client.requestAccessToken();
        }
    };

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
            const formattedEvents = data.items.map((event) => ({
                id: event.id,
                title: event.summary,
                start: new Date(event.start.dateTime || event.start.date),
                end: new Date(event.end.dateTime || event.end.date),
                description: event.description || 'Sin descripción',
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error en fetchEvents:', error);
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event); // Guarda el evento seleccionado
        setShowPopup(true); // Muestra el popup
    };

    const handleClosePopup = () => {
        setShowPopup(false); // Cierra el popup
        setSelectedEvent(null); // Limpia el evento seleccionado
    };

    const handlePopupClick = (e) => {
        e.stopPropagation(); // Evita que el clic dentro del popup cierre el popup
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent || !token) return;

        try {
            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${selectedEvent.id}?key=${API_KEY}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                setEvents(events.filter((event) => event.id !== selectedEvent.id)); // Elimina el evento localmente
                handleClosePopup(); // Cierra el popup
            } else {
                console.error('Error al eliminar el evento');
            }
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        }
    };

    const handleUpdateEvent = async (updatedEvent) => {//funcion para actualizar eventos que conversa con api de google calendar.
        if (!updatedEvent || !token) return;

        try {
            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${updatedEvent.id}?key=${API_KEY}`,
                {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        summary: updatedEvent.title,
                        start: { dateTime: updatedEvent.start.toISOString() },
                        end: { dateTime: updatedEvent.end.toISOString() },
                        description: updatedEvent.description,
                    }),
                }
            );

            if (response.ok) {
                setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
                handleClosePopup();
            } else {
                console.error('Error al actualizar el evento');
            }
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
        }
    };
    const handleEditEvent = () => {
        if (!selectedEvent) return;

        const updatedTitle = prompt('Actualizar título del evento:', selectedEvent.title);
        const updatedDescription = prompt('Actualizar descripción del evento:', selectedEvent.description);
        const updatedStartInput = prompt('Actualizar fecha de inicio (YYYY-MM-DDTHH:mm:ss):', selectedEvent.start.toISOString());
        const updatedEndInput = prompt('Actualizar fecha de fin (YYYY-MM-DDTHH:mm:ss):', selectedEvent.end.toISOString());

        const updatedStart = updatedStartInput ? new Date(updatedStartInput) : null;
        const updatedEnd = updatedEndInput ? new Date(updatedEndInput) : null;

        if (updatedTitle && updatedDescription && updatedStart && updatedEnd && !isNaN(updatedStart) && !isNaN(updatedEnd)) {
            const updatedEvent = {
                ...selectedEvent,
                title: updatedTitle,
                description: updatedDescription,
                start: updatedStart,
                end: updatedEnd,
            };
            handleUpdateEvent(updatedEvent);
        } else {
            alert('Por favor, ingrese fechas válidas en el formato correcto.');
        }
    };
    const handleViewChange = (newView) => {
        setView(newView);
    };

    const handleNext = () => {
        if (view === 'month') {
            const nextMonth = new Date(currentDate);
            nextMonth.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(nextMonth);
        } else if (view === 'week') {
            const nextWeek = new Date(currentDate);
            nextWeek.setDate(currentDate.getDate() + 7);
            setCurrentDate(nextWeek);
        }
    };

    const handleBack = () => {
        if (view === 'month') {
            const previousMonth = new Date(currentDate);
            previousMonth.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(previousMonth);
        } else if (view === 'week') {
            const previousWeek = new Date(currentDate);
            previousWeek.setDate(currentDate.getDate() - 7);
            setCurrentDate(previousWeek);
        }
    };

    return (
        <div>
            <h1>Calendario de Eventos</h1>
            {token ? (
                <>
                    <div className="view-buttons">
                        <button onClick={() => handleViewChange('month')}>Month</button>
                        <button onClick={() => handleViewChange('week')}>Week</button>
                        {view === 'week' && (
                            <>
                                <button onClick={handleBack}>Back</button>
                                <button onClick={handleNext}>Next</button>
                            </>
                        )}
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        onSelectEvent={handleSelectEvent}
                        view={view} // Cambiar la vista del calendario
                        onView={handleViewChange} // Maneja el cambio de vista semana o mes...
                        date={currentDate} // Establece la fecha actual en el calendario
                        toolbar={true} // Habilita nuevamente la barra de herramientas (agenda))
                        components={{
                            agenda: {
                                event: ({ event }) => (
                                    <span>
                                        <strong>{event.title}</strong>
                                        {event.desc && ":  " + event.desc}
                                    </span>
                                ),
                            },
                        }} // Habilita la vista de agenda para mostrar eventos en una lista
                    />
                    {showPopup && selectedEvent && (
                        <div className="popup-overlay" onClick={handleClosePopup}>
                            <div className="popup" onClick={handlePopupClick}>
                                <h2>{selectedEvent.title}</h2>
                                <p><strong>Fecha:</strong> {selectedEvent.start.toLocaleString()}</p>
                                <p><strong>Descripción:</strong> {selectedEvent.description}</p>
                                <button onClick={handleEditEvent}>Actualizar</button>
                                <button onClick={handleDeleteEvent}>Eliminar</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <button id="signin-button">Iniciar sesión con Google</button>
            )}
        </div>
    );
};
export default CalendarEvents;


