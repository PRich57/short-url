import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER_URLS } from "../utils/queries";
import { DELETE_URL, DELETE_USER } from "../utils/mutations";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import { 
  Typography, 
  Paper, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  // Use state for dialog warning
  const [openDialog, setOpenDialog] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);

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

  // Handle dialog open and close
  const handleDialogOpen = (urlId) => {
    if (doNotShowAgain) {
      handleDeleteUrl(urlId);
    } else {
      setUrlToDelete(urlId);
      setOpenDialog(true);
    }
  };
  
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  
  const handleConfirmDelete = () => {
    handleDeleteUrl(urlToDelete);
    handleDialogClose();
  };
  

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
        {urlsData && (
          <RecentURLsList
            urls={urlsData.getUserUrls}
            onDeleteClick={handleDialogOpen}
            showDelete={true}
          />
        )}
      </Paper>
      <Dialog
        className="dialog-container"
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialog-title">{"Confirm URL Deletion"}</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText className="dialog-text">
            Deleting this URL is permanent and it will no longer redirect to the original source.
          </DialogContentText>
        </DialogContent>
        <div className="dialog-actions">
          <FormControlLabel
            control={
              <Checkbox 
                checked={doNotShowAgain} 
                onChange={
                  (e) => setDoNotShowAgain(e.target.checked)
                } 
                className="checkbox"
              />
            }
            label="Do not show this again"
            className="checkbox-text"
            />
          <DialogActions>
            <Button onClick={handleDialogClose} className="cancel">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary" autoFocus className="delete">
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default Profile;
