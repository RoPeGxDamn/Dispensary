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

export const SpecialtyBar = observer(() => {
  const { basket, entity } = useContext(Context);
  const classes = useStyles();

  return (
    <>
      <List component={Paper}>
      <ListItem button onClick={() => basket.setSelectedType('Все специалисты')}>
          <ListItemText>
              <Typography variant="body2" className={classes.item}>
                Все специалисты
              </Typography>
            </ListItemText>
          </ListItem>
        {entity.specialties.map((item) => (
          <ListItem button onClick={() => basket.setSelectedType(item.name)}>
            <ListItemText>
              <Typography variant="body2" className={classes.item}>
                {item.name}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
});
