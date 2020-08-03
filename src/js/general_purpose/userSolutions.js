import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import exclamation from '../../img/exclamation.svg'
import 'simplebar/dist/simplebar.min.css';
import { hasTime } from '../../functions/func';

class UserSolutions extends React.Component {
   constructor(props) {
      super(props);
      this.state = {solDisplay: 1, disableBlur: false};
   }

   changeDisplay(newNum) {
      this.setState({ solDisplay: newNum, disableBlur: false });
   }

   render() {
      const buttonClass = (num) => {
         if(num === this.state.solDisplay)
            return 'selected'
         else
            return ''
      }

      let containerClass = 'fade-in'

      let showWarning = false;

      if(this.props.canBlur) {
         let startTime = this.props.loggedData[`comb${this.state.solDisplay}`].startDate;

         if((startTime == 0 || hasTime(startTime)) && !this.state.disableBlur) {
            containerClass += ' no-answer';
            showWarning = true;
         }
      }

      return (
         <Container className={containerClass} id='display-all'>
            {showWarning &&
            <div className='answer-warning'>
               <div>
                  <img src={exclamation} alt='Exclamation sign' />
                  <h2>You have not submitted your solution yet!</h2>
               </div>
               <p>Are you sure you want to see the scramble and the solution?</p>
               <button onClick={() => this.setState({ disableBlur: true })}>Continue</button>
            </div>
            }
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
                  <input type='text' value={this.props.userSol[`comb${this.state.solDisplay}`].sol || ''}></input>
               </Col>
            </Row>
            <Row className='body-title'>
               <Col>
               <h3>Explanation</h3>
               </Col>
            </Row>
            <Row id='explanation'>
               <Col>
                  <textarea readOnly value={this.props.userSol[`comb${this.state.solDisplay}`].explanation || ''}></textarea>
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