import React from 'react'
import '../../css/dashboardActual.css'
import LoadingView from '../general_purpose/loadingView'
import ChallengeCard from './challengeCard'
import LoginPanel from '../navbar_login/loginPanel';

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.state = {userResponse: {}, loaded: false, showLogin: false};
        this.showLogin = this.showLogin.bind(this);
    }

    componentDidMount() {
        fetch('/challData/getChallengeData', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            this.setState({userResponse: data, loaded: true});
        })
    }

    showLogin() {
        this.setState({
            showLogin: this.state.showLogin ? false : true
        })
    }

    render() {
        if(this.state.loaded)
            return(
                <>
                    {this.state.showLogin &&
                    <LoginPanel closePanel={this.showLogin} />}
                    <div id='dashboardActual' style={{overflow: 'hidden'}}>
                        <div id='header'>
                            <h1>Take a look at this week's scrambles</h1>
                        </div>
                        <div id='challenges' className='fade-in' style={{overflow: 'hidden'}}>
                            <ChallengeCard showLogin={this.showLogin} isLogged={this.props.user.logged} comb={1} solMoves={this.state.userResponse.comb1.moves} startDate={this.state.userResponse.comb1.startDate}/>
                            <ChallengeCard showLogin={this.showLogin} isLogged={this.props.user.logged} comb={2} solMoves={this.state.userResponse.comb2.moves} startDate={this.state.userResponse.comb2.startDate}/>
                            <ChallengeCard showLogin={this.showLogin} isLogged={this.props.user.logged} comb={3} solMoves={this.state.userResponse.comb3.moves} startDate={this.state.userResponse.comb3.startDate}/>
                        </div>
                    </div>
                </>
            );
        else
            return (<LoadingView />);
    }
}

export default DashboardActual;