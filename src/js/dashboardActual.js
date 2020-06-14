import React from 'react'
import '../css/dashboardActual.css'
import LoadingView from './loadingView'
import {isSolved} from '../functions/cubeSolve'
import ModifyPanel from './modifyPanel'
import LoginPanel from './loginPanel'

class ChallengeData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showPanel: false}
    }

    render() {
        let showButton;

        if(this.props.solMoves === 0)
            showButton = <button className='bton-load-sol not-loaded' onClick={() => this.props.showPanel(this.props.comb)}>Load solution</button>;
        else if(this.props.solMoves > 0)
            showButton = <button className='bton-load-sol loaded-sol' onClick={() => this.props.showPanel(this.props.comb)}>See solution</button>;
        else
            showButton = <button className='bton-load-sol incorrect-sol' onClick={() => this.props.showPanel(this.props.comb)}>Incorrect solution</button>;

        return (
            <div className='challengeData'>
                <div className='challengeComb'>  
                    <p>{this.props.challenge}</p>
                </div>
                {showButton}
            </div>
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
            console.log(challenge);
            setTimeout(() => this.setState({challenges: challenge, userResponse: uRes, loaded: true}), 400);
        });
    }

    showPanel(number) {
        this.setState({showComb: number});

        if(this.props.user.logged)
            this.state({panel: <ModifyPanel closePanel={() => this.showPanel(0)} challenge={this.state.challenges[`comb${this.state.showComb}`]} nComb={this.state.showComb} submitRes={this.submitResponse} resData={this.state.userResponse[`comb${this.state.showComb}`]}/>});
        else
            this.setState({panel: <LoginPanel />})
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
                this.showPanel(0);
            })
            .catch(e => alert('An error occured'));
        } else
            this.showPanel(0);
    }

    render() {
        if(this.state.loaded)
            return(
                <div id='dashboard'>
                    <ChallengeData challenge={this.state.challenges.comb1} solMoves={this.state.userResponse.comb1.moves} showPanel={(n) => this.showPanel(n)} comb={1}/>
                    <ChallengeData challenge={this.state.challenges.comb2} solMoves={this.state.userResponse.comb2.moves} showPanel={(n) => this.showPanel(n)} comb={2}/>
                    <ChallengeData challenge={this.state.challenges.comb3} solMoves={this.state.userResponse.comb3.moves} showPanel={(n) => this.showPanel(n)} comb={3}/>
                    {this.state.showComb !== 0 &&
                    this.state.panel}
                </div>
            );
        else
            return (<LoadingView />);
    }
}

export default DashboardActual;