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
      <List>
        {urls.map((url) => (
          <ListItem key={url._id}>
            <ListItemText
              primary={
                <Typography style={{ marginBottom: "10px", color: "white", wordBreak: "break-all" }}>
                  Short URL :{" "}
                  <Link
                    href={url.fullShortUrl}
                    target="_blank"
                    style={{ color: "#8EE4AF", fontSize: "calc(13px + .2vw)" }}
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
                    style={{ color: "#D86C70", fontSize: "calc(9px + .1vw)" }}
                  >
                    {url.originalUrl}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RecentURLsList;
