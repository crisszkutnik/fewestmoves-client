import React from 'react'
import '../css/loadingView.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Imported from Material UI webpage

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

// My code

class LoadingView extends React.Component {
   constructor() {
      super();
      this.state = {dots: 0};
   }

   componentDidMount() {
      this.setState({interval: setInterval(() => this.setState({dots: (this.state.dots === 3 ? 0 : this.state.dots + 1)}), 500)});
   }

   componentWillUnmount() {
     clearInterval(this.state.interval);
   }

   render() {
      return(
         <div id='loading-view'>
            <CircularIndeterminate />
            <h2>Loading{'.'.repeat(this.state.dots)}</h2>
         </div>
      )
   }
}

export default LoadingView;