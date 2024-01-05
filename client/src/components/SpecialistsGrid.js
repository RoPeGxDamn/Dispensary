import React, { useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import SpecialistCard from "./SpecialistCard";

const useStyles = makeStyles((theme) => ({
  grid: {
    overflowY: "scroll",
    minWidth: "100%",
    height: "80vh",
  },
}));

export const SpecialistsGrid = observer(() => {
  const classes = useStyles();
  const { entity } = useContext(Context);

  return (
    <Grid container className={classes.grid} xs={12} md={6} spacing={2}>
      {entity.specialists.map((item) => (
        <SpecialistCard key={item.id} specialist={item} />
      ))}
    </Grid>
  );
});
