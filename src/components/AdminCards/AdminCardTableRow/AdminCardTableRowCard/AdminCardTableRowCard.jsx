import React from 'react';
import { useDispatch } from 'react-redux';

  //MUI
import {
    makeStyles,
    Card,
    CardMedia,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 300,
    },
    media: {
        height: 140,
    },
}));

export default function AdminCardTableRow(props) {
        //state
        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
        //onRender
    return(
        <Card className={classes.root}>
        {/*This component will render each image passed on props, 
        potentially add onclick dialog dialog BEEG picture*/}
            <CardMedia
            className={classes.media}
            image={props.image}
            />
        </Card>
    )
}