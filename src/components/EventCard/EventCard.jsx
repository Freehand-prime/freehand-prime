// routing
import { useHistory } from 'react-router-dom';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

// this component renders a card with event details based on the props passed to it
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
            Next Event - {new Date(event.date).toLocaleDateString('en-US')}
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
