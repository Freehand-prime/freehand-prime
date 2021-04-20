// MUI
import {
  makeStyles,
  Grid,
  Grow,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";

// Custom components
import CardCard from "../CardCard/CardCard";

// MUI style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    margin: 8,
  },
  titlePaper: {
    margin: 15,
    padding: 10,
    marginTop: 5,
  },
  buttonDiv: {
    marginTop: 20,
  },
}));

export default function CardBrowser() {

  // Cards selector
  const cards = useSelector((store) => store?.cards);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();


  // Handle back
  const handleBack = () => {
    history.push(`/edit/${id}`);
  };

  // UseEffect for GET cards
  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
  }, []);

  return (
    <div className={classes.gridDiv}>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography gutterBottom align="center" variant="h5" component="h2">
          Tap a card image to see the inside view
        </Typography>
      </Paper>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {cards?.map((card, i) => {
          return (
            <Grow in={true} key={i}>
              <Grid item key={i}>
                <CardCard card={card} buttonTitle={buttonTitle} eventId={id} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>
      <br />
      <div className={classes.buttonDiv}>
        <center>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleBack}
          >
            Edit Event Details
          </Button>
        </center>
      </div>
    </div>
  );
}
