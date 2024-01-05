import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    opacity: .8,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AnnouncementItem({item}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {item.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {new Date(item.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          {item.message}
        </Typography>
      </CardContent>
    </Card>
  );
}