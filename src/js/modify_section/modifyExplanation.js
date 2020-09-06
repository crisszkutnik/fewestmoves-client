import React from "react";
import LoadingView from "../general_purpose/loadingView";
import ScrambleTime from "./scrambleTime";
import ModifyForm from "./modifyForm";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "./backButton"

class ModifyExplanation extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         resData: {},
         scramble: '',
         loaded: false,
         redirect: false
      };

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
      Promise.all([fetch('/challData/activeChallengeData', this.headers), fetch('/challData/getScramble', this.headers)])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([resData, scramble]) => {
         this.setState({
            resData,
            scramble,
            loaded: true,
         });
      })
      .catch(() => alert("An error ocurred"));
   }

   render() {
      if(!this.state.loaded)
         return (<LoadingView />);
      else
         return (
            <div id='modify-challenge'>
               <BackButton redFunc={() => this.setState({ redirect: true })} />
               <Container id='modify-container'>
                  <Row>
                     <Col className='page-card page-card-top-left mb-2' lg='6' md='12'>
                        <ScrambleTime minutes={0} seconds={0} scramble={this.state.scramble}/>
                     </Col>
                     <Col className='page-card page-card-top-right mb-2' lg='5' md='12'>
                        <scramble-display scramble={this.state.scramble}></scramble-display>
                     </Col>
                  </Row>
                  <Row>
                     <Col id='bottom-container' className='page-card page-card-bottom' lg='11' md='12'>
                        <ModifyForm redirect={this.state.redirect} timeLeft={this.state.timeLeft} reqComb={this.props.match.params.comb} modifySol={false} sol={this.state.resData.sol} explanation={this.state.resData.explanation} scramble={this.state.scramble}/>
                     </Col>
                  </Row>
               </Container>
            </div>
         );
   }
}

export default ModifyExplanation;