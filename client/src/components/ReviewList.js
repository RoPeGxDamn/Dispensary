import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { Context } from "../index";
import ReviewItem from "./ReviewItem";

const ReviewList = observer(() => {
  const { entity } = useContext(Context);
  return (
    <>
      {entity.feedback.length === 0 ? (
        <Box
          style={{
            height: 100,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography style={{ letterSpacing: "2px" }}>Отзывов нет</Typography>
        </Box>
      ) : (
        entity.feedback.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      )}
    </>
  );
});

export default ReviewList;
