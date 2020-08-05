import React from 'react'

class ScrambleTime extends React.Component {
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
         <h1>{this.parseNumber(this.props.minutes)}:{this.parseNumber(this.props.seconds)}</h1>
         <span>minutes left</span>
         </>
      );
   }
}

export default ScrambleTime;