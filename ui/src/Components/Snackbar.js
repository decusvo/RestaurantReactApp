// Code copied and modified from material-ui website
// https://material-ui.com/components/snackbars/

import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomSnackbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason == 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.data.severity}>{props.data.message}</Alert>
      </Snackbar>
    </div>
  )
}
