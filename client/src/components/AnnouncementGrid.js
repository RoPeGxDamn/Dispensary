import React, { useContext, useEffect } from "react";
import { Grid, makeStyles, Box, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import SpecialistCard from "./SpecialistCard";
import AnnouncementItem from "./AnnouncementItem";
import {
  fetchAnnouncements,
  getAnnouncementsForReader,
} from "../http/announcementAPI";

const useStyles = makeStyles((theme) => ({}));

export const AnnouncementGrid = observer(({ type }) => {
  const classes = useStyles();
  const { entity } = useContext(Context);

  useEffect(() => {
    try {
      getAnnouncementsForReader(type).then((data) => {
        entity.setAnnouncements(data);
      });
    } catch (err) {
      console.error(err.message);
    }
  }, []);
  return (
    <Grid className={classes.grid}>
      {entity.announcements.length === 0 ? (
        <Box
          style={{
            height: "449px",
            display: "grid",
            placeItems: "center",
            color: "white",
          }}
        >
          <Typography style={{ letterSpacing: "2px" }}>Новостей пока нет</Typography>
        </Box>
      ) : (
        <></>
      )}
      {
        entity.announcements.map((item) => (
        <Grid
          item
          key={item.id}
          xs={12}
          md={12}
          style={{ marginBottom: "10px" }}
        >
          <AnnouncementItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
});
