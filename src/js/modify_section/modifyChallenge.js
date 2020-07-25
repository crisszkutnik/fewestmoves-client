import React from 'react'
import arrow from "../../img/arrow.svg"
import LoadingView from "../general_purpose/loadingView"
import ScrambleTime from './scrambleTime'
import ModifyForm from './modifyForm'
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

class ModifySection extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         resData: {},
          scramble: '',
           loaded: false,
         }

      this.timerControl = this.timerControl.bind(this);

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
      .then(([resData, scramble]) => {
         let time = Date.now();
         let endTime = resData.startDate + 3.6e+6;

         let timeLeft = endTime - time

         let minutes = Math.floor(timeLeft/60000);

         this.setState({
            resData: resData,
            scramble: scramble,
            minutes: minutes, 
            seconds: Math.round(timeLeft/1000 - minutes*60),
            loaded: true,
            timeLeft: timeLeft
         })
      })
      .catch(() => alert("An error ocurred"));
   }

   componentDidMount() {
      this.interval = setInterval(this.timerControl, 1000);
   }

   componentWillUnmount() {
      clearInterval(this.interval);
   }

   timerControl() {
      if(this.state.seconds !== 0)
         this.setState({ seconds: this.state.seconds - 1 });
      else 
         this.setState({ seconds: 59, minutes: this.state.minutes - 1 });
   }

   render() {
      if(!this.state.loaded)
         return (<LoadingView />);
      else
         return (
            <div id='modify-challenge'>
               <BackButton />
               <Container id='modify-container'>
                  <Row>
                     <Col className='page-card page-card-top-left mb-2' lg='6' md='12'>
                        <ScrambleTime minutes={this.state.minutes} seconds={this.state.seconds} scramble={this.state.scramble}/>
                     </Col>
                     <Col className='page-card page-card-top-right mb-2' lg='5' md='12'>
                        <scramble-display scramble={this.state.scramble}></scramble-display>
                     </Col>
                  </Row>
                  <Row>
                     <Col id='bottom-container' className='page-card page-card-bottom' lg='11' md='12'>
                        <ModifyForm timeLeft={this.state.timeLeft} reqComb={this.props.match.params.comb} sol={this.state.resData.sol} explanation={this.state.resData.explanation} scramble={this.state.scramble}/>
                     </Col>
                  </Row>
               </Container>
            </div>
         );
   }
}

const BackButton = () => {
   const history = useHistory();

   return (
      <div id='back-button' onClick={() => history.push('/dashboard/actual')}>
         <img src={arrow} alt='arrow' />
         <h1>Return to home page</h1>
      </div>
   );
}

export default ModifySection;