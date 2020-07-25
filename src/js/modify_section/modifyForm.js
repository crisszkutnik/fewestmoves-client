import React from 'react'
import { isSolved } from '../../functions/cubeSolve'

class ModifyForm extends React.Component {
   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
         solution: this.props.sol,
         explanation: this.props.explanation,
      }
   }

   handleChange(e) {
      let target = e.target;

      this.setState({
         [target.name]: target.value
      });
   }

   render() {
      let moves = isSolved(this.state.solution, this.props.scramble);

      return (
         <form>
            <label htmlFor='solution'>Solution</label>
               <div>
                  <input 
                     id='solution' 
                     className='inputField'         
                     name='solution'
                     type='text'
                     onChange={this.handleChange}
                     value={this.state.solution} 
                  />
                  <span>{moves === -1 ? 'DNF':moves}</span>
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
      );
   }
}

export default ModifyForm;