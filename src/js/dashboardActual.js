import React from 'react'
import '../css/dashboardActual.css'
import LoadingView from './loadingView'
import {isSolved} from '../functions/cubeSolve'
import ModifyPanel from './modifyPanel'
import LoginPanel from './loginPanel'
import {Container, Row, Col} from 'react-bootstrap'
import correctIMG from '../img/tick.svg'
import incorrectIMG from '../img/incorrect.svg'
import notLoadedIMG from '../img/exclamation.svg'


class ChallengeData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let showClass = 'text-white text-center solution-card px-2';
        let text;
        let moves;
        let image;

        if(this.props.solMoves === 0) {
            text = 'Not loaded yet';
            showClass += ' sol-not-loaded';
            moves = 0;
            image = <img src={notLoadedIMG}></img>
        } else if(this.props.solMoves > 0) {
            text = 'Correct solution';
            showClass += ' sol-loaded';
            moves = this.props.solMoves;
            image = <img src={correctIMG}></img>
        } else {
            text = 'Incorrect solution'
            showClass += ' sol-incorrect';
            moves = 'DNF';
            image = <img src={incorrectIMG}></img>
        }

        return (
            <Container className={showClass}>
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
                        movements
                        </span>}
                    </Col>
                </Row>
                <Row className='sol-button'> 
                    <Col>
                        <button onClick={() => this.props.showPanel(this.props.comb)}>Load solution</button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.submitResponse = this.submitResponse.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.state = {challenges: {}, userResponse: {}, loaded: false, showComb: 1};

        this.fetch1url = '/challData/getChallenge';
        this.fetch1Props = {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };

        this.fetch2url = '/challData/getResponse';
        this.fetch2Props = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };
    }

    componentWillMount() {
        Promise.all([fetch(this.fetch1url, this.fetch1Props), fetch(this.fetch2url, this.fetch2Props)])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([challenge, uRes]) => {
            setTimeout(() => this.setState({challenges: challenge, userResponse: uRes, loaded: true}), 400);
        });
    }

    showPanel() {
        if(this.props.user.logged)
            return (<ModifyPanel closePanel={() => this.setState({showComb: 0})} challenge={this.state.challenges[`comb${this.state.showComb}`]} nComb={this.state.showComb} submitRes={this.submitResponse} resData={this.state.userResponse[`comb${this.state.showComb}`]}/>);
        else
            return (<LoginPanel closePanel={() => this.setState({showComb: 0})}/>);
    }

    submitResponse(newSol, newExp, modComb) {
        let res = this.state.userResponse;

        if(newSol !== this.state.userResponse[`comb${modComb}`].sol || newExp !== this.state.userResponse[`comb${modComb}`].explanation) {
            res[`comb${modComb}`].sol = newSol;
            res[`comb${modComb}`].explanation = newExp;

            if(newSol === '')
                res[`comb${modComb}`].moves = 0;
            else 
                res[`comb${modComb}`].moves = isSolved(this.state.challenges[`comb${modComb}`], newSol);

            fetch('/challData/submitResponse', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(res)
            })
            .then(() => {
                this.setState({showComb: 0})
            })
            .catch(e => alert('An error occured'));
        } else
            this.setState({showComb: 0})
    }

    render() {
        if(this.state.loaded)
            return(
                <div id='dashboardActual'>
                    <div id='header'>
                        <h1>Take a look at this week challenges</h1>
                    </div>
                    <div id='challenges'>
                        <ChallengeData challenge={this.state.challenges.comb1} solMoves={this.state.userResponse.comb1.moves} showPanel={(n) => this.setState({showComb: n})} comb={1}/>
                        <ChallengeData challenge={this.state.challenges.comb2} solMoves={this.state.userResponse.comb2.moves} showPanel={(n) => this.setState({showComb: n})} comb={2}/>
                        <ChallengeData challenge={this.state.challenges.comb3} solMoves={this.state.userResponse.comb3.moves} showPanel={(n) => this.setState({showComb: n})} comb={3}/>
                        {this.state.showComb !== 0 &&
                        this.showPanel()}
                    </div>
                </div>
            );
        else
            return (<LoadingView />);
    }
}

export default DashboardActual;