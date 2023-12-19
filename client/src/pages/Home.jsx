import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_URLS } from "../utils/queries";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import { Paper, Typography, Link } from "@mui/material";

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
          margin: "2rem 0",
        }}
      >
        <h1>Shorten URL</h1>
        <ShorteningForm onShorten={refetch} />
        {urlsData && 
          <>
            <Typography
              variant="h5"
              style={{
                marginBottom: "10px",
                color: "white",
                letterSpacing: ".2rem",
              }}
            >
              My Recent URLs:
            </Typography>
            <RecentURLsList urls={urlsData.getUserUrls.slice(0, 3)} />
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
          </>
        }
      </Paper>
    </div>
  );
}

export default Home;
