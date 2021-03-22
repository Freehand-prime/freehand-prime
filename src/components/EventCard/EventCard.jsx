// Router
import { useHistory } from "react-router-dom";

// MUI
import {
  makeStyles,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

// MUI style
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function EventCard({ event, includeName }) {
  //hooks
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Next Event - {new Date(event.date).toLocaleDateString("en-US")}
          </Typography>
          {includeName && (
            <Typography variant="h5" component="h2">
              {event.name}
            </Typography>
          )}
          <Typography className={classes.pos} color="textSecondary">
            {event.occasion} | {event.category}
          </Typography>
          <Box align="right">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => history.push(`/edit/${event.event_id}`)}
            >
              Edit Event
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
