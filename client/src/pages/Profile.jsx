import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_URLS } from "../utils/queries";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Link,
} from "@mui/material";

function Profile() {
  const { user } = useUser();
  const { data: urlsData, refetch } = useQuery(GET_USER_URLS, {
    variables: { userId: user?._id },
    fetchPolicy: "network-only",
  });

  console.log(user);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="center">
      <Paper
        style={{
          padding: "20px",
          backgroundColor: "#dedede",
          margin: "3rem 0",
        }}
      >
        <h1 style={{ textTransform: 'uppercase' }}>{user.username}</h1>
        <ShorteningForm onShorten={refetch} />
        <Typography
          variant="h5"
          style={{
            marginBottom: "10px",
            color: "white",
            letterSpacing: ".2rem",
          }}
        >
          My Complete List of URLs:
        </Typography>
        {urlsData && <RecentURLsList urls={urlsData.getUserUrls} />}
      </Paper>
    </div>
  );
}

export default Profile;
