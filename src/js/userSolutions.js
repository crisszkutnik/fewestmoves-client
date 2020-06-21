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
         <Container id='display-all'>
            <Row id='title'>
               <Col>
                  <h2 className='scramble'>{this.props.challenges[`comb${this.state.solDisplay}`]}</h2>
               </Col>
            </Row>
            <Row className='body-title'>
               <Col>
                  <h3>Solution</h3>
               </Col>
            </Row>
            <Row id='solution'>
               <Col>
                  <input type='text' value={this.props.userSol[`comb${this.state.solDisplay}`].sol}></input>
               </Col>
            </Row>
            <Row className='body-title'>
               <Col>
               <h3 id='explanation'>Explanation</h3>
               </Col>
            </Row>
            <Row id='explanation'>
               <Col>
                  <textarea readOnly value={this.props.userSol[`comb${this.state.solDisplay}`].explanation}></textarea>
               </Col>
            </Row>
            <Row id="buttons">
               <Col>
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