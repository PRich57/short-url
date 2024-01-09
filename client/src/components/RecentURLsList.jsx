import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Link,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import { DeleteOutline, ContentCopy, Check } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import { theme, deleteTheme } from "../utils/theme/customTheme";

function RecentURLsList({ urls, onDeleteClick, showDelete }) {
  // Add in functionality for copying short URL to clipboard
  const [copiedUrlId, setCopiedUrlId] = useState(null);

  useEffect(() => {
    if (copiedUrlId) {
      const timer = setTimeout(() => setCopiedUrlId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedUrlId]);

  const handleCopy = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrlId(id);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <List style={{ padding: "0 10px" }}>
      {urls.map((url) => (
        <ListItem
          key={url._id}
          secondaryAction={
            <div className="tooltips">
              <ThemeProvider theme={theme}>
                <Tooltip
                  title={copiedUrlId === url._id ? "Copied!" : "Copy Short URL"}
                  arrow
                  disableFocusListener
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                >
                  <IconButton
                    edge="end"
                    aria-label="copy"
                    onClick={() => handleCopy(url.fullShortUrl, url._id)}
                    sx={{ margin: "1rem", marginRight: "0", marginTop: "0" }}
                  >
                    {copiedUrlId === url._id ? (
                      <Check style={{ color: "#8EE4AF" }} />
                    ) : (
                      <ContentCopy style={{ color: "#8EE4AF", fontSize: 25 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </ThemeProvider>
              <ThemeProvider theme={deleteTheme}>
                {showDelete && (
                  <Tooltip
                    title="Delete"
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onDeleteClick(url._id)}
                      sx={{ margin: "1rem", marginRight: "0", marginTop: "0" }}
                    >
                      <DeleteOutline style={{ color: "white", fontSize: 27 }} />
                    </IconButton>
                  </Tooltip>
                )}
              </ThemeProvider>
            </div>
          }
        >
          <ListItemText
            primary={
              <Typography
                style={{
                  marginBottom: "10px",
                  color: "white",
                  wordBreak: "break-word",
                  marginRight: "1rem"
                }}
              >
                Short URL :{" "}
                <Link
                  href={url.fullShortUrl}
                  target="_blank"
                  style={{ color: "#8EE4AF", fontSize: "calc(14px + .2vw)" }}
                >
                  {url.fullShortUrl}
                </Link>
              </Typography>
            }
            secondary={
              <Typography
                style={{
                  fontSize: "13px",
                  marginBottom: "10px",
                  marginRight: "4.4rem",
                  color: "white",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxHeight: "6em",
                }}
              >
                Original URL : {" "}
                <Link
                  href={url.originalUrl}
                  target="_blank"
                  style={{ 
                    color: "#ff4e3b", 
                    fontSize: "calc(9px + .1vw)", 
                    wordBreak: "break-all",
                  }}
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
