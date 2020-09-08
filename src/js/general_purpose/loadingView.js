import React from "react";
import CircularIndeterminate from "./circularProgress"

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
      );
   }
}

export default LoadingView;