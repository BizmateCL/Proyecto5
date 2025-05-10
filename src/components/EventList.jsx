import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const EventList = ({ events }) => {
    return (
        <div>
            <Typography variant="h6">Upcoming Events</Typography>
            <List>
                {events.map((event) => (
                    <ListItem key={event.id}>
                        <ListItemText
                            primary={event.summary}
                            secondary={new Date(event.start.dateTime || event.start.date).toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default EventList;