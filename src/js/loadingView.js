import React from 'react'
import '../css/loadingView.css'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

/*Imported from materialUI page*/

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    width: 300,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
    </div>
  );
}

class LoadingView extends React.Component {
   constructor() {
      super();
      this.state = {dots: 0};
   }

   componentDidMount() {
      this.setState({interval: setInterval(() => this.setState({dots: (this.state.dots == 3 ? 0 : this.state.dots + 1)}), 500)});
   }

   componentWillUnmount() {
     clearInterval(this.state.interval);
   }

   render() {
      return(
         <div id='loading-view'>
            <LinearIndeterminate />
            <h2>Loading{'.'.repeat(this.state.dots)}</h2>
         </div>
      )
   }
}

export default LoadingView;