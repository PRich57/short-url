import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER_URLS } from "../utils/queries";
import { DELETE_URL, DELETE_USER } from "../utils/mutations";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import { Typography, Paper } from "@mui/material";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  const { data: urlsData, refetch } = useQuery(GET_USER_URLS, {
    variables: { userId: user._id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
  }, []);

  // Delete url mutation hook
  const [deleteUrl] = useMutation(DELETE_URL, {
    // Refetch for real time update
    onCompleted: () => {
      refetch();
    },
  });

  // Function for calling delete mutation
  const handleDeleteUrl = async (urlId) => {
    try {
      await deleteUrl({
        variables: { urlId },
      });
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };

  // Delete user hook
  // const [deleteUser] = useMutation(DELETE_USER, {
  //   variable: { userId: user._id },
  //   onCompleted: () => {
  //     localStorage.removeItem("token");
  //     navigate("/")
  //   },
  //   onError: (err) => {
  //     console.error(err.message);
  //   }
  // });

  // const handleDeleteUser = async () => {
  //   try {
  //     await deleteUser();
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }

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
        <h1>{user.username}</h1>
        <ShorteningForm onShorten={refetch} />
        <Typography
          variant="h5"
          style={{
            marginBottom: "10px",
            color: "#8EE4AF",
            letterSpacing: ".2rem",
          }}
        >
          My URLs:
        </Typography>
        <p style={{ 
          color: "#ff4e3b", 
          marginBottom: "0", 
          paddingBottom: "0" 
          }}
        >
          Warning: Deleting a short URL will remove it permanently and it will no longer redirect to the original source. 
        </p>
        {urlsData && (
          <RecentURLsList
            urls={urlsData.getUserUrls}
            onDeleteUrl={handleDeleteUrl}
            showDelete={true}
          />
        )}
      </Paper>
    </div>
  );
}

export default Profile;
