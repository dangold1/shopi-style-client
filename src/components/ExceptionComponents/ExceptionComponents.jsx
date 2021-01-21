import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
  error: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
}));


export const LoadingComponent = props => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress />
      <strong>Loading...</strong>
    </div>
  );
}


export const ErrorComponent = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <Alert severity="error" elevation={6} variant="filled">
        <AlertTitle>Error</AlertTitle>
        {message ? <strong>{message}</strong> : <strong>check which error</strong>}
      </Alert>
    </div>
  );
}


