import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_URLS } from "../utils/queries";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import { Snackbar, Alert } from "@mui/material";

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
      <ShorteningForm onShorten={refetch} />
      {urlsData && <RecentURLsList urls={urlsData.getUserUrls.slice(0, 3)} />}
    </div>
  );
}

export default Home;
