import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper, Link } from '@mui/material';

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
              primary={<Link href={url.fullShortUrl} target="_blank">{url.fullShortUrl}</Link>}
              secondary={<Link href={url.originalUrl} target="_blank">{url.originalUrl}</Link>}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RecentURLsList;