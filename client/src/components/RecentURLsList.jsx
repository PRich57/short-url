import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Link,
  IconButton,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material"

function RecentURLsList({ urls, onDeleteClick, showDelete }) {
  return (
    <List style={{ padding: "0 15px" }}>
      {urls.map((url) => (
        <ListItem 
          key={url._id}
          secondaryAction={showDelete && (
            <IconButton 
              edge="end" 
              aria-label="delete" 
              onClick={() => onDeleteClick(url._id)}
            >
              <DeleteOutline style={{ color: "white" }} />
            </IconButton>
          )}
        >
          <ListItemText
            primary={
              <Typography
                style={{
                  marginBottom: "10px",
                  color: "white",
                  wordBreak: "break-word",
                }}
              >
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
              <Typography
                style={{
                  marginBottom: "10px",
                  color: "white",
                  wordBreak: "break-all",
                }}
              >
                Original URL :{" "}
                <Link
                  href={url.originalUrl}
                  target="_blank"
                  style={{ color: "#ff4e3b", fontSize: "calc(9px + .1vw)" }}
                >
                  {url.originalUrl}
                </Link>
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default RecentURLsList;
