import { observer } from "mobx-react-lite";
import React, { useEffect, useContext } from "react";
import { Container, makeStyles, CssBaseline, Grid } from "@material-ui/core";
import { fetchSpecialists, filterSpecialists } from "../../http/specialistAPI";
import { SpecialistsGrid } from "../../components/SpecialistsGrid";
import { SpecialtyBar } from "../../components/SpecialtyBar";
import { Context } from "../../index";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
  },
}));

export const SpecialistsPage = observer(() => {
  const classes = useStyles();
  const { entity, basket } = useContext(Context);

  useEffect(async () => {
    switch (basket.selectedType) {
      case entity.specialties[0]?.name: {
        await filterSpecialists(basket.selectedType).then((data) => {
          entity.setSpecialists(data);
        });
        break;
      }
      case entity.specialties[1]?.name: {
        await filterSpecialists(basket.selectedType).then((data) => {
          entity.setSpecialists(data);
        });
        break;
      }
      default:
        await fetchSpecialists().then((data) => {
          entity.setSpecialists(data);
        });
        break;
    }
  }, [basket.selectedType]);

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SpecialtyBar />
        </Grid>
        <Grid item xs={12} md={9}>
          <SpecialistsGrid />
        </Grid>
      </Grid>
    </Container>
  );
});
