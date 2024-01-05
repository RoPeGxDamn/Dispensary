import React, { useContext, useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { TimeGridItem } from "./TimeGridItem";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { getOneSpecialist } from "../http/specialistAPI";

const useStyles = makeStyles((theme) => ({
  grid: {
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TimeGrid = observer(() => {
  const tickets = [];
  const classes = useStyles();
  const { ticket } = useContext(Context);
  const [specialistInfo, setSpecialistInfo] = useState({});
  const [allTickets, setAllTickets] = useState([]);
  const [availableTickets, setAvailableTickets] = useState([]);

  useEffect(async () => {
    await getOneSpecialist(ticket.specialist).then((data) => {
      setSpecialistInfo(data);
    });
  }, []);

  useEffect(() => {
    getTickets();
    getVisualData();
  }, [ticket.orderedTickets]);

  const getTickets = () => {
    try {
      const array = [];
      for (
        let i = specialistInfo.startTime;
        i < specialistInfo.endTime;
        i += specialistInfo.interval / 100
      ) {
        const afterDot = i.toFixed(2).toString().split(".")[1];
        if (i >= 12 && i <= 13) {
          continue;
        }
        if (afterDot == 60) {
          i = +(++i.toString().split(".")[0] + ".0");
        } else if (afterDot > 60) {
          i = +(
            ++i.toString().split(".")[0] + `.${"0" + afterDot.toString()[1]}`
          );
        }
        if (i.toFixed(2) > 18 - specialistInfo.interval / 100) {
          break;
        }
        if (i.toString().split(".")[0].length === 1) {
          array.push({
            id: i,
            time: "0" + i.toFixed(2).toString().replaceAll(".", ":"),
          });
        } else {
          array.push({
            id: i,
            time: i.toFixed(2).toString().replaceAll(".", ":"),
          });
        }
      }
      setAllTickets(array);
      ticket.setAllTickets(array);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getVisualData = async () => {
    let findCount = 0;
    let findItem = false;
    if (new Date(ticket.visitDate) < new Date(Date.now())) {
      let activePlaces = []
      if(new Date(ticket.visitDate).getDate() === new Date(Date.now()).getDate()) {
        activePlaces = allTickets.filter((item) => {
          return (
            +item.time.substring(0, 2) >= new Date(Date.now()).getHours() ||
            (+item.time.substring(0, 2) >= new Date(Date.now()).getHours() &&
              +item.time.substring(3, 5) >= new Date(Date.now()).getMinutes())
          );
        });
      }
      console.log(activePlaces);
      for (let i = 0; i < allTickets.length - activePlaces.length; i++) {
        tickets.push({ id: i, time: allTickets[i].time, past: true });
      }
      console.log(tickets);
      for (let i = 0; i < activePlaces.length; i++) {
        findItem = false;
        for (let y = 0; y < ticket.orderedTickets.length; y++) {
          if (ticket.orderedTickets.length == findCount) {
            break;
          } else if (
            `${activePlaces[i]?.time}:00` == ticket.orderedTickets[y]?.visitTime
          ) {
            tickets.push({ id: i, time: activePlaces[i].time, occupied: true });
            findCount++;
            findItem = true;
            break;
          }
        }
        if (!findItem)
          tickets.push({ id: i, time: activePlaces[i].time, occupied: false });
      }
    } else {
      for (let i = 0; i < allTickets.length; i++) {
        findItem = false;
        for (let y = 0; y < ticket.orderedTickets.length; y++) {
          if (ticket.orderedTickets.length == findCount) {
            break;
          } else if (
            `${allTickets[i]?.time}:00` == ticket.orderedTickets[y]?.visitTime
          ) {
            tickets.push({ id: i, time: allTickets[i].time, occupied: true });
            findCount++;
            findItem = true;
            break;
          }
        }
        if (!findItem)
          tickets.push({ id: i, time: allTickets[i].time, occupied: false });
      }
    }

    setAvailableTickets(
      tickets.map((item) => (
        <TimeGridItem
          key={item.id}
          cupon={item}
          occupied={item?.occupied}
          past={item?.past}
        />
      ))
    );
  };

  return (
    <>
      <Grid container className={classes.grid}>
        {availableTickets}
      </Grid>
    </>
  );
});
