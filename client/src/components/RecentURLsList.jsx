import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Link,
} from "@mui/material";

function RecentURLsList({ urls }) {
  return (
    <Paper style={{ padding: "20px", backgroundColor: "#444444" }} className="recent-urls">
      <Typography variant="h5" style={{ marginBottom: "10px", color: "white" }}>
        Your recent URLs
      </Typography>
      <List>
        {urls.map((url) => (
          <ListItem key={url._id}>
            <ListItemText
              primary={
                <Typography style={{ marginBottom: "10px", color: "white" }}>
                  Short URL :{" "}
                  <Link
                    href={url.fullShortUrl}
                    target="_blank"
                    style={{ color: "#8EE4AF", fontSize: "18px" }}
                  >
                    {url.fullShortUrl}
                  </Link>
                </Typography>
              }
              secondary={
                <Typography style={{ marginBottom: "10px", color: "white", wordBreak: "break-all" }}>
                  Original URL :{" "}
                  <Link
                    href={url.originalUrl}
                    target="_blank"
                    style={{ color: "#D86C70", fontSize: "11px" }}
                  >
                    {url.originalUrl}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" style={{ marginBottom: "10px", color: "white" }}>
        Visit your{" "}
        <Link
          href="/profile"
          style={{ textDecoration: "none", color: "#8EE4AF" }}
        >
          Profile
        </Link>{" "}
        to see a complete list of your shortened URLs.
      </Typography>
    </Paper>
  );
}

export default RecentURLsList;
