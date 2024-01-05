import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  item: {
    letterSpacing: "2px",
    fonstVariant: "all-small-caps",
  },
}));

export const PatientBasketBar = observer(() => {
  const { basket } = useContext(Context);
  const classes = useStyles();

  return (
    <>
      <List component={Paper}>
        <ListItem button onClick={() => basket.setSelectedType("Все талоны")}>
          <ListItemText>
            <Typography variant="body2" className={classes.item}>
              Все талоны
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem button onClick={() => basket.setSelectedType("Активные")}>
          <ListItemText>
            <Typography variant="body2" className={classes.item}>
              Активные
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem button onClick={() => basket.setSelectedType("Неактивные")}>
          <ListItemText>
            <Typography variant="body2" className={classes.item}>
              Неактивные
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
});
