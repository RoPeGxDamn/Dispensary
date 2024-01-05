import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Grid,
  Avatar,
  ButtonGroup,
  Box,
  makeStyles,
  IconButton,
  Tooltip,
  Input,
  InputLabel,
} from "@material-ui/core";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import SpecialistAccordion from "./SpecialistAccordion";
import { getOneUser, editSpecialistProfile } from "../http/userAPI";
import { getOneSpecialist } from "../http/specialistAPI";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: "100%",
  },
  form: {
    width: "100%",
    padding: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: 210,
    height: 210,
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  fileInput: {
    position: "absolute",
    overflow: "hidden",
    opacity: 0,
    Zindex: "-1",
    width: "0.1px",
    height: "0.1px",
  },
}));

export default observer(function SpecialistEditForm({specialist}) {
  const { auth, profile, popup } = useContext(Context);
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(specialist?.user || {});
  const [deviceUpload, setDeviceUpload] = useState(false);
  const [specialistInfo, setSpecialistInfo] = useState(specialist || {});
  const [profilePhoto, setProfilePhoto] = useState(specialist?.photo || {});

  useEffect(() => {
    try {
      if(!specialist) {
        getOneUser(auth.user.id).then((data) => {
          setUserInfo(data);
        });
        getOneSpecialist(auth.specialist).then((data) => {
          setSpecialistInfo(data);
          setProfilePhoto(data.photo);
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  const editProfile = () => {
    try {
      if (profile.formData != {}) {
        editSpecialistProfile(profile.formData).then(() => {
          popup.setEditSpecialistProfilePopupOpen(false)
        })
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDeviceUpload(true);
        setProfilePhoto(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    profile.setPhotoForDB(e.target.files[0]);
  };

  return (
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
      <Grid item container xs={4} md={4}>
          <Grid
            item
            xs={12}
            md={9}
            style={{ display: "grid", placeItems: "center" }}
          >
            {deviceUpload ? (
              <Avatar className={classes.avatar} src={profilePhoto} />
            ) : (
              <Avatar
                className={classes.avatar}
                src={process.env.REACT_APP_API_URL + profilePhoto}
              />
            )}
          </Grid>
          <Grid item xs={12} md={3} className={classes.leftSide}>
            <Tooltip title="Редактировать">
              <IconButton onClick={editProfile}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Загрузить фото">
              <IconButton>
                <InputLabel className={classes.uploadButton} htmlFor="upload">
                  <AddPhotoAlternateIcon />
                </InputLabel>
              </IconButton>
            </Tooltip>
            <Input
              className={classes.fileInput}
              label="Фото"
              id="upload"
              fullWidth
              type="file"
              onChange={imageHandler}
            />
          </Grid>
        </Grid>
        <Grid item xs={8} md={8}>
          <SpecialistAccordion user={userInfo} specialist={specialistInfo} />
        </Grid>
      </Grid>
    </form>
  );
});
