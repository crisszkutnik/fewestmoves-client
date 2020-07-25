import React from 'react'
import correctIMG from "../../img/tick.svg";
import incorrectIMG from "../../img/incorrect.svg";
import arrow from "../../img/arrow.svg"
import LoadingView from "../general_purpose/loadingView"
import ScrambleTime from './scrambleTime'
import ModifyForm from './modifyForm'
import { Container, Row, Col } from "react-bootstrap";

class ModifySection extends React.Component {
   constructor(props) {
      super(props);
      this.state = {resData: {}, scramble: '', loaded: false}

      this.headers = {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify({reqComb: this.props.match.params.comb})
      }
   }

   componentWillMount() {
      Promise.all([fetch('/newChallData/activeChallengeData', this.headers), fetch('/newChallData/getScramble', this.headers)])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([resData, scramble]) => this.setState({resData: resData, scramble: scramble, loaded: true}))
      .catch(() => alert("An error ocurred"));
   }

   render() {
      if(!this.state.loaded)
         return (<LoadingView />);
      else
         return (
            <div id='modify-challenge'>
               <BackButton />
               <Container>
                  <Row>
                     <Col>
                        <ScrambleTime startDate={this.state.resData.startDate} scramble={this.state.scramble}/>
                     </Col>
                     <Col>
                        <scramble-display scramble={this.state.scramble}></scramble-display>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <ModifyForm sol={this.state.resData.sol} explanation={this.state.resData.explanation} scramble={this.state.scramble}/>
                     </Col>
                  </Row>
               </Container>
            </div>
         );
   }
}

class BackButton extends React.Component {
   render() {
      return (
         <div id='back-button' style={{paddingTop: '150px'}}>
            <img src={arrow} alt='arrow' />
            <h1>Return to home page</h1>
         </div>
      );
   }
}

export default ModifySection;