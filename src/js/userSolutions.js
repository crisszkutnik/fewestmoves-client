import React from 'react'
import '../css/userSolutions.css'
import {Container, Row, Col} from 'react-bootstrap'
import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

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
         <Container id='display-all' className='px-3 py-3'>
            <Row>
               <Col>
                  <h2 className='scramble'>{this.props.challenges[`comb${this.state.solDisplay}`]}</h2>
                  <hr className='separator' />
               </Col>
            </Row>
            <Row id='res-data'>
               <Col>
                  <h3>Solution</h3>
                  <input type='text' value={this.props.userSol[`comb${this.state.solDisplay}`].sol} id="solution"></input>
                  <h3 id='explanation'>Explanation</h3>
                  <textarea readOnly value={this.props.userSol[`comb${this.state.solDisplay}`].explanation}></textarea>
               </Col>
            </Row>
            <Row>
               <Col id="buttons">
                  <button className={buttonClass(1)} onClick={() => this.changeDisplay(1)}>1</button>
                  <button className={buttonClass(2)} onClick={() => this.changeDisplay(2)}>2</button>
                  <button className={buttonClass(3)} onClick={() => this.changeDisplay(3)}>3</button>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default UserSolutions;