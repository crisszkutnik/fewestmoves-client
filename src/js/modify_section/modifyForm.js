import React from 'react'
import { isSolved } from '../../functions/cubeSolve'
import { Redirect } from 'react-router-dom'
import correctIMG from "../../img/tick.svg";
import incorrectIMG from "../../img/incorrect.svg";

class ModifyForm extends React.Component {
   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.saveData = this.saveData.bind(this);
      this.saveStatus = this.saveStatus.bind(this);

      this.state = {
         solution: this.props.sol,
         explanation: this.props.explanation,
         savedSol: this.props.sol,
         savedExp: this.props.explanation
      }
   }

   componentDidMount() {
      // every 5 minutes
      this.interval = setInterval(this.saveData, 300000);

      // Save and send when there is no time left
      this.timeout = setTimeout(() => {
         this.saveData();
         this.setState({redirect: true});
      }, this.props.timeLeft);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
      clearTimeout(this.setTimeout);
   }

   handleChange(e) {
      let target = e.target;
      let str = target.value;

      // Parse the solution
      if(target.name === 'solution')
         str = str.replace(/^\s/gm, "").replace(/\s\s+/gm, " ").replace(/’/gm, "'");

      this.setState({
         [target.name]: str,
      });
   }

   saveData() {
      let save = {
         modComb: {
            sol: this.state.solution.trim(),
            explanation: this.state.explanation
         },
         reqComb: this.props.reqComb
      };

      fetch('/challData/modifyChallenge', {
            method: 'POST',
            headers: { 
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(save)
      })
      .then(() => {
         this.setState({
            savedSol: save.modComb.sol,
            savedExp: save.modComb.explanation
         });
      })
      .catch(() => alert('An error ocurred'));
   }

   saveStatus() {
      if(this.state.solution === this.state.savedSol && this.state.explanation === this.state.savedExp)
         return (
            <>
            <img alt="Saved" src={correctIMG}/><p style={{color: 'var(--ok-green)'}}>Solution saved</p>
            </>
         );
      else
         return (
            <>
            <img alt="Not saved" src={incorrectIMG} /><p style={{color: 'var(--incorrect-red)'}}>Solution not saved!</p>
            <button onClick={this.saveData}>Save now</button>
            </>
         );
   }

   render() {
      let moves = isSolved(this.props.scramble, this.state.solution.trim());

      return (
         <div>
            <form>
               <label htmlFor='solution'>Solution</label>
                  <div id="sol-input">
                     <input 
                        id='solution' 
                        className='inputField'         
                        name='solution'
                        type='text'
                        onChange={this.handleChange}
                        value={this.state.solution} 
                     />
                     <div className='moves'><span>{moves === -1 ? 'DNF':moves}</span></div>
                  </div>
               <label htmlFor='explanation'>Explanation</label>
               <textarea 
                  spellCheck='false' 
                  className='inputField' 
                  name='explanation'
                  onChange={this.handleChange}
                  value={this.state.explanation}>
               </textarea>
            </form>
            <div id='save-status'>
               {this.saveStatus()}
            </div>
            {this.state.redirect &&
            <Redirect to='/dashboard/actual' />}
         </div>
      );
   }
}

export default ModifyForm;