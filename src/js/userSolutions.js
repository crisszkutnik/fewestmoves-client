import React from 'react'
import '../css/userSolutions.css'

class UserSolutions extends React.Component {
   constructor(props) {
      super(props);
      this.state = {solDisplay: 1};
   }

   changeDisplay(newNum) {
      this.setState({solDisplay: newNum});
   }

   render() {
      const buttonClass = (num) => {
         if(num == this.state.solDisplay)
            return 'selected'
         else
            return ''
      }

      return (
      <div id='display-all'>
         <div id='title-separator'>
            <h1 className='scramble'>{this.props.challenges[`comb${this.state.solDisplay}`]}</h1>
            <hr className='separator' />
         </div>
         <div className='user-response'>
            <h2>Solution</h2>
            <p>{this.props.userSol[`comb${this.state.solDisplay}`].sol}</p>
            <h2>Explanation</h2>
            <textarea readOnly value={this.props.userSol[`comb${this.state.solDisplay}`].explanation}></textarea>
         </div>
         <div className='selector'>
            <button className={buttonClass(1)} onClick={() => this.changeDisplay(1)}>1</button>
            <button className={buttonClass(2)} onClick={() => this.changeDisplay(2)}>2</button>
            <button className={buttonClass(3)} onClick={() => this.changeDisplay(3)}>3</button>
         </div>
      </div>
      );
   }
}

export default UserSolutions;