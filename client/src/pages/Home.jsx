import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER_URLS } from "../utils/queries";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import { Paper, Typography } from "@mui/material";

function Home() {
  const { user } = useUser();
  const { data: urlsData, refetch } = useQuery(GET_USER_URLS, {
    variables: { userId: user?._id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <Paper
        style={{
          padding: "20px",
          backgroundColor: "#dedede",
          margin: "3rem 0",
        }}
        className="paper"
      >
        <h1>Shorten Your URL</h1>
        <ShorteningForm onShorten={refetch} />
        {urlsData && 
          <>
            <Typography
              variant="h5"
              style={{
                marginBottom: "10px",
                color: "#8EE4AF",
                letterSpacing: ".2rem",
              }}
            >
              My Recent URLs:
            </Typography>
            <RecentURLsList urls={urlsData.getUserUrls.slice(0, 3)} showDelete={false} />
            <Typography variant="h6" style={{ marginBottom: "10px", color: "white" }}>
              Visit your{" "}
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "#8EE4AF" }}
                >
                Profile
              </Link>{" "}
              to see a complete list of your shortened URLs!
            </Typography>
          </>
        }
      </Paper>
    </div>
  );
}

export default Home;
