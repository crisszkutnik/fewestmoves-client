import React from 'react'

class ScrambleTime extends React.Component {
   constructor(props) {
      super(props);
      this.timerControl = this.timerControl.bind(this);
      this.parseNumber = this.parseNumber.bind(this);

      this.time = Date.now();
      this.endTime = this.props.startDate + 3.6e+6;

      this.state = {
         minutes: Math.floor((this.endTime - this.time)/60000), 
         seconds: this.seconds = Math.round((this.endTime - this.time)/1000 - Math.floor((this.endTime - this.time)/60000)*60)
      }

      this.interval = null;
   }

   componentDidMount() {
      setInterval(this.timerControl, 1000);
   }

   timerControl() {
      if(this.state.seconds !== 0)
         this.setState({ seconds: this.state.seconds - 1 });
      else 
         this.setState({ seconds: 59, minutes: this.state.minutes - 1 });
   }

   parseNumber(num) {
      return (num >= 10 ? num : '0' + num)
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   render() {
      return (
         <>
         <p>{this.props.scramble}</p>
         <h1>{this.parseNumber(this.state.minutes)}:{this.parseNumber(this.state.seconds)}</h1>
         <span>minutes left</span>
         </>
      );
   }
}

export default ScrambleTime;