import React from "react"
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// Imported from Material UI webpage

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const CircularIndeterminate = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{height: '60px', width: '60px', overflow: 'hidden', color: 'var(--darker-violet)'}}/>
    </div>
  );
}

export default CircularIndeterminate;