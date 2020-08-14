import React from 'react'

class ScrambleTime extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         opacity: 1
      }

      this.parseNumber = this.parseNumber.bind(this);
      this.changeTimeVisibility = this.changeTimeVisibility.bind(this);
   }

   parseNumber(num) {
      return (num >= 10 ? num : '0' + num)
   }

   changeTimeVisibility() {
      this.setState({
         opacity: this.state.opacity === 1 ? 0 : 1
      });
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   render() {
      return (
         <>
            <p>{this.props.scramble}</p>
            <h1 style={{opacity: this.state.opacity}}>{this.parseNumber(this.props.minutes)}:{this.parseNumber(this.props.seconds)}</h1>
            <span style={{opacity: this.state.opacity}}>minutes left</span>
            <button onClick={this.changeTimeVisibility}>{this.state.opacity === 1 ? "Hide time" : "Show time"}</button>
         </>
      );
   }
}

export default ScrambleTime;