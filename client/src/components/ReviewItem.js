import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Avatar, Box } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Star from "../assets/images/star.png";
import EmptyStar from "../assets/images/empty-star.png";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  img: {
    width: "100px",
    height: "100px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  star: {
    width: "20px",
    height: "20px",
    marginRight: "2px",
  },
});

const ReviewItem = observer(({ review }) => {
  const stars = [];
  const classes = useStyles();
  const { admin, auth } = useContext(Context);

  const getStars = () => {
    for (let i = 1; i <= 5; i++) {
      if (i <= review.rating) {
        stars.push(<Avatar className={classes.star} src={Star} />);
      } else {
        stars.push(<Avatar className={classes.star} src={EmptyStar} />);
      }
    }
    return stars;
  };

  return (
    <Grid item xs={12} md={12}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Grid container xs={12} md={12}>
              <Grid item xs={2} md={2}>
                {review.publicStatus ? (
                  <Avatar
                    src={process.env.REACT_APP_API_URL + review.patient.photo}
                    className={classes.img}
                  />
                ) : (
                  <Avatar className={classes.img} />
                )}
              </Grid>
              <Grid item xs={10} md={10}>
                <Grid item container xs={12} md={12}>
                  <Grid item xs={4} md={4}>
                    <Typography variant="h6">{review.patient.name}</Typography>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Typography variant="h6">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    md={4}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Box className={classes.container}>{getStars()}</Box>
                  </Grid>
                </Grid>
                <Grid
                  style={{ overflowWrap: "break-word", padding: "5px" }}
                  item
                  xs={12}
                  md={12}
                >
                  <Typography variant="body1">{review.body}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
});

export default ReviewItem;
