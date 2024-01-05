import React, { useEffect, useContext, useState, useRef, createRef } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    cursor: "pointer",
    letterSpacing: "2px",
  },
  inner: {
    padding: theme.spacing(3),
  },
  occupied: {
    backgroundColor: "#f07a7a",
  },
  free: {
    backgroundColor: "#88d468",
  },
  past: {
    backgroundColor: "#3f51b5",
    color: "white",
  },
  selected:{
    color: 'white',
    backgroundColor: 'black'
  }
}));

export const TimeGridItem = observer(({ cupon, occupied, past }) => {
  const classes = useStyles();
  const { ticket } = useContext(Context);
  const item = createRef(null)

  const handleClick = () => {
    const elements = document.querySelectorAll(`.${classes.selected}`)
    elements.forEach(item => {
      item.classList.remove(classes.selected)
  })
    const element = item.current
    element.classList.add(classes.selected)
  };

  return (
    <>
      {occupied === true ? (
        <Grid
          disabled
          item
          xs={12}
          sm={6}
          md={4}
          className={[classes.item, classes.occupied]}
        >
          {cupon?.time}
        </Grid>
      ) : past === true ? (
        <Grid
          item
          disabled
          xs={12}
          sm={6}
          md={4}
          className={[classes.item, classes.past]}
        >
          {cupon?.time}
        </Grid>
      ) : (
        <Grid
          item
          ref={item}
          xs={12}
          sm={6}
          md={4}
          className={[classes.item, classes.free]}
          onClick={() => {
            ticket.setVisitTime(cupon?.time + ":00");
            handleClick()
          }}
        >
          {cupon?.time}
        </Grid>
      )}
    </>
  );
});
