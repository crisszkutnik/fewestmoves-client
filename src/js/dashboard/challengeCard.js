import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {hasTime} from '../../functions/func'
import correctIMG from '../../img/tick.svg'
import incorrectIMG from '../../img/incorrect.svg'
import notLoadedIMG from '../../img/exclamation.svg'
import {Redirect} from 'react-router-dom'

class ConfirmationPanel extends React.Component {
    constructor(props) {
        super(props);
        this.startChallenge = this.startChallenge.bind(this);

        this.state = {redirect: false}
    }

    startChallenge() {
        fetch('/newChallData/startChallenge', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(() => this.setState({redirect: true}))
    }

    render() {
        let redirect = `/modifySolution/comb${this.props.comb}`

        return (
            <div className='black-background'>
               <div className='scramble-alert'>
                  <div id='conf-text'>
                     <p><strong>Be careful!</strong> Once you start you will have one hour to submit your solution.</p>
                     <span>Are you sure you want to continue?</span>
                  </div>
                  <div id='conf-button'>
                     <button onClick={this.startChallenge}>Continue</button>
                     <button>Cancel</button>
                     <p>Note: your solution is saved every 5 minutes.</p>
                  </div>
               </div>
               {this.state.redirect &&
                <Redirect to={redirect} />}
            </div>
         );
    }
}

class ChallengeCard extends React.Component {
   constructor(props) {
       super(props);
		 this.modifyRes = this.modifyRes.bind(this);
		 
		 this.state = {showConf: false}
   }

   componentDidMount() {
       //Animation setup

       document.getElementById(`load-sol-button${this.props.comb}`).addEventListener('mouseenter', () => {
           document.getElementById(`scramble${this.props.comb}`).classList.add('card-expand-hover');
       })

       document.getElementById(`load-sol-button${this.props.comb}`).addEventListener('mouseout', () => {
           document.getElementById(`scramble${this.props.comb}`).classList.remove('card-expand-hover');
       })
   }

   componentWillUnmount() {
       document.getElementById(`load-sol-button${this.props.comb}`).removeEventListener('mouseenter');
       document.getElementById(`load-sol-button${this.props.comb}`).removeEventListener('mouseout');
   }

   modifyRes() {
      if(hasTime(this.props.startDate) || this.props.startDate === 0)
         return <ConfirmationPanel comb={this.props.comb}/>
      else
         alert(`You do not have time left, ${Number(this.props.startDate) + 3.6e+6 - Date.now()}`);
   }

   render() {
       let showClass = `text-white text-center solution-card px-2`;
       let text;
       let moves;
       let image;

        console.log(this.props.startDate);

       if(this.props.solMoves === 0 && this.props.startDate === 0) {
           text = 'Not loaded yet';
           showClass += ' sol-not-loaded';
           moves = 0;
           image = <img alt='Exclamation sign' src={notLoadedIMG}></img>
       } else if(this.props.solMoves > 0) {
           text = 'Correct solution';
           showClass += ' sol-loaded';
           moves = this.props.solMoves;
           image = <img alt='Correct solution' src={correctIMG}></img>
       } else {
           text = 'Incorrect solution'
           showClass += ' sol-incorrect';
           moves = 'DNF';
           image = <img alt='Incorrect solution' src={incorrectIMG}></img>
       }

       return (
           <Container className={showClass} id={`scramble${this.props.comb}`}>
               <Row className='sol-status'>
                   <Col className='sol-status-info'>
                       {image}
                       <p>{text}</p>
                   </Col>
               </Row>
               <Row className='sol-moves'>
                   <Col>
                       <h2>{moves}</h2><br />
                       {moves >= 0 &&
                       <span>
                       moves
                       </span>}
                   </Col>
               </Row>
               <Row className='sol-button'> 
                   <Col>
                       <button id={`load-sol-button${this.props.comb}`} onClick={() => this.setState({showConf: true})}>Load solution</button>
                   </Col>
               </Row>
					{this.state.showConf &&
					this.modifyRes()}
           </Container>
       );
   } 
}

export default ChallengeCard;