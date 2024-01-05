import React, { useContext, useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchSpecialists } from "../http/specialistAPI";
import { SpecialistItem } from "./SpecialistItem";
import { SearchSpecialistsBar } from "./SearchSpecialistsBar";

const useStyles = makeStyles((theme) => ({
  grid: {
    overflowY: "scroll",
    height: '520px'
  },
}));

export const SpecialistGrid = observer(() => {
  const classes = useStyles();
  const { entity } = useContext(Context);

  useEffect(() => {
    fetchSpecialists().then((data) => {
      entity.setSpecialists(data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
    <Grid item xs={12} md={12}>
      <SearchSpecialistsBar/>
    </Grid>
    <Grid item container spacing={2} className={classes.grid}>
    {entity.specialists.map((item) => (
        <Grid item key={item.id}>
            <SpecialistItem specialist={item}/>
        </Grid>
      ))}
    </Grid>
  </Grid>
  );
});
