import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Popup from "./Popup";
import ReviewForm from "./ReviewForm";
import { SpecialistProfileForm } from "./SpecialistProfileForm";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles({
  root: {
    maxWidth: 260,
  },
});

export default observer(function SpecialistCard({ specialist }) {
  const { popup } = useContext(Context);
  const classes = useStyles();
  const [reviewPopupOpen, setReviewPopupOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Specialist Photo"
              height="230"
              image={process.env.REACT_APP_API_URL + specialist.photo}
              title="Specialist Photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {`${specialist.surname} ${specialist.name} ${specialist.patronymic}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {specialist.specialty}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => setReviewPopupOpen(true)}
            >
              Отзыв
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => setProfilePopupOpen(true)}
            >
              Подробнее
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Popup
        openPopup={reviewPopupOpen}
        setOpenPopup={() => {
          setReviewPopupOpen(false);
        }}
        title="Оставить отзыв"
      >
        <ReviewForm specialist={specialist} />
      </Popup>
      <Popup
        openPopup={profilePopupOpen}
        setOpenPopup={() => {
          setProfilePopupOpen(false);
        }}
        title="Профиль специалиста"
      >
        <SpecialistProfileForm specialist={specialist} />
      </Popup>
    </>
  );
});
