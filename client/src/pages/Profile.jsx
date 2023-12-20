import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_USER_URLS, GET_USER_DATA } from "../utils/queries";
import { DELETE_URL, DELETE_USER, DISMISS_DIALOG } from "../utils/mutations";
import { useUser } from "../components/UserContext";
import ShorteningForm from "../components/ShorteningForm";
import RecentURLsList from "../components/RecentURLsList";
import { ReportGmailerrorred } from "@mui/icons-material";
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

  // Use state for dialog warning and deletion type
  const [openDialog, setOpenDialog] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);
  // URL or User
  const [deletionType, setDeletionType] = useState(null);
  const [dialogMessage, setDialogMessage] = useState("");

  const { data: urlsData, refetch: refetchUrls } = useQuery(GET_USER_URLS, {
    variables: { userId: user._id },
    fetchPolicy: "network-only",
  });

  const { data: userData } = useQuery(GET_USER_DATA, {
    variables: { userId: user._id },
  });

  // Check user's preferences on component mount
  useEffect(() => {
    refetchUrls();
    if (userData && userData.getUserData) {
      setDoNotShowAgain(userData.getUserData.dismissDeleteUrlDialog);
    }
  }, [userData, refetchUrls]);

  // Delete url mutation hook
  const [deleteUrl] = useMutation(DELETE_URL, {
    // Refetch for real time update
    onCompleted: () => refetchUrls(),
  });

  // Delete user hook
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => {
      localStorage.removeItem("token");
      navigate("/");
    },
    onError: (err) => console.error(err.message),
  });

  // Use new field added to user to permanently dismiss dialog once selected
  const [setDismissDialog] = useMutation(DISMISS_DIALOG);

  // Handle dialog open and message depending on type
  const handleDialogOpen = (urlId, type = "url") => {
    setDeletionType(type);
    setUrlToDelete(urlId);
    setDialogMessage(
      type === "url"
        ? "Deleting this URL is permanent and it will no longer redirect to the original source."
        : "Are you sure you want to delete your account? All short URLs will be disabled."
    );

    // Set it up so only url delete has the option to permanently dismiss the modal
    if (type === "url" && doNotShowAgain) {
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
    if (deletionType === "url") {
      handleDeleteUrl(urlToDelete);
    } else if (deletionType === "user") {
      handleDeleteUser();
    }
    handleDialogClose();
  };

  // Function for calling delete url mutation
  const handleDeleteUrl = async (urlId) => {
    try {
      await deleteUrl({
        variables: { urlId },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function for calling delete user mutation
  const handleDeleteUser = async () => {
    try {
      await deleteUser({
        variables: { userId: user._id },
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCheckboxChange = async (event) => {
    const dismiss = event.target.checked;
    setDoNotShowAgain(dismiss);
    try {
      await setDismissDialog({
        variables: { userId: user._id, dismiss }
      });
    } catch (err) {
      console.error(err.message);
    }
  };

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
        <ShorteningForm onShorten={refetchUrls} />
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
            onDeleteClick={(urlId) => handleDialogOpen(urlId, "url")}
            showDelete={true}
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDialogOpen(null, "user")}
          style={{ marginTop: "20px", backgroundColor: "#FFC27F", color: "#05386B" }}
        >
          <ReportGmailerrorred style={{ margin: "0 10px" }} />
          Delete My Account
          <ReportGmailerrorred style={{ margin: "0 10px" }} />
        </Button>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="dialog-title">
          {deletionType === "url"
            ? "Confirm URL Deletion"
            : "Confirm Account Deletion"}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText className="dialog-text">
            {dialogMessage}
          </DialogContentText>
          <div className="dialog-actions">
            {deletionType === "url" && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={doNotShowAgain}
                    onChange={handleCheckboxChange}
                    className="checkbox"
                  />
                }
                label="Do not show this again"
                className="checkbox-text"
              />
            )}
            <DialogActions>
              <Button onClick={handleDialogClose} className="cancel">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                color="primary"
                autoFocus
                className="delete"
              >
                Delete
              </Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Profile;
