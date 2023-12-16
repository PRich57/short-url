import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

function RecentURLsList({ urls }) {
  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant='h6' style={{ marginBottom: '10px' }}>
        Your recent URLs
      </Typography>
      <List>
        {urls.map((url) => (
          <ListItem key={url._id}>
            <ListItemText
              primary={url.fullShortUrl}
              secondary={url.originalUrl}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RecentURLsList;