import React from 'react'
import '../css/dashboardActual.css'
import LoadingView from './loadingView'
import {isSolved} from '../functions/cubeSolve'
import ModifyPanel from './modifyPanel'
import LoginPanel from './loginPanel'
import {Container, Row, Col} from 'react-bootstrap'
import ReactDOM from 'react-dom'

class ChallengeData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showPanel: false}
    }

    render() {
        let showButton;
        let showClass = 'text-white text-center px-2 solBtn contPadding';
        let text;

        let click = () => this.props.showPanel(this.props.comb);

        if(this.props.solMoves === 0) {
            text = 'Load solution';
            showClass += ' sol-loaded';
        } else if(this.props.solMoves > 0) {
            text = 'See solution';
            showClass += ' sol-not-loaded'
        } else {
            text += 'Incorrect solution'
            showClass += ' sol-incorrect';
        }

        return (
            <Row className="justify-content-center mb-2 rowSetting">
                <Col xs="9" sm="9" md="8" lg="8" xl="8" className="text-center scrambleContainer contPadding px-3">
                    {this.props.challenge}
                </Col>
                <Col xs="2" lg="2" xl="2" onClick={click} className={showClass}>{text}</Col>
            </Row>
        );
    }
}

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.submitResponse = this.submitResponse.bind(this);
        this.showPanel = this.showPanel.bind(this);
        this.state = {challenges: {}, userResponse: {}, loaded: false, showComb: 0};

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
                <Container id='dashboardActual'>
                    <ChallengeData challenge={this.state.challenges.comb1} solMoves={this.state.userResponse.comb1.moves} showPanel={(n) => this.setState({showComb: n})} comb={1}/>
                    <ChallengeData challenge={this.state.challenges.comb2} solMoves={this.state.userResponse.comb2.moves} showPanel={(n) => this.setState({showComb: n})} comb={2}/>
                    <ChallengeData challenge={this.state.challenges.comb3} solMoves={this.state.userResponse.comb3.moves} showPanel={(n) => this.setState({showComb: n})} comb={3}/>
                    {this.state.showComb !== 0 &&
                    this.showPanel()}
                </Container>
            );
        else
            return (<LoadingView />);
    }
}

export default DashboardActual;