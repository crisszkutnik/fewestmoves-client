import React from 'react'
import '../css/submitted.css'
import LoadingView from './loadingView'
import UserSolutions from './userSolutions'
import showSol from '../functions/func'

class SubmittedSol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amountReceived: 0, info: [], fetchedData: false, display: 0, challenges: {}};
        this.getMore = this.getMore.bind(this);
        this.changeDisplayInfo = this.changeDisplayInfo.bind(this);
        this.renderNames = this.renderNames.bind(this);

        this.fetch1 = '/allRes/otherUsers';
        this.fetch2 = '/challData/getChallenge';

        this.headers = {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };
    }

    changeDisplayInfo(newElement) {
        this.setState({display: newElement});
    } 

    componentWillMount() {
        Promise.all([fetch(this.fetch1, Object.assign({method: 'POST'}, this.headers)), fetch(this.fetch2, Object.assign({method: 'GET'}, this.headers))])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([responses, rChallenges]) => {
            setTimeout(() => this.setState({info: responses, fetchedData: true, challenges: rChallenges}), 400);
        });
    }

    renderNames() {
        let all = [];

        this.state.info.forEach((elem, index) => {
            let divClass;

            if(this.state.display == index)
                divClass = 'user-data selected';
            else
                divClass= 'user-data';

            all.push(
                <div onClick={() => this.changeDisplayInfo(index)} className={divClass} key={index}>
                    <h1>{elem.name} {elem.surname}</h1>
                    <p>{showSol(elem.comb1.moves)}{showSol(elem.comb2.moves)}{showSol(elem.comb3.moves)}</p>
                </div>
            )
        })

        return all;
    }

    //Loads 10 elements from the user responses
    getMore() {
        fetch('/allRes/otherUsers', {
            method: 'POST',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({skip: this.state.info.length})
        })
        .then(res => res.json())
        .then(usersRes => {
            this.setState({info: this.state.info.concat(usersRes)})
        });
    }

    render() {
        if(this.state.fetchedData)
            return (
                <div id='dashboard-submitted'>
                {this.state.info.length != 0 &&
                <>
                    <div id='select-user'>
                        <div id='see-users'>
                            {this.renderNames()}
                        </div>
                        <div id='load-button'>
                            <button onClick={this.getMore}>Load more</button>
                        </div>
                    </div>
                    <UserSolutions userSol={this.state.info[this.state.display]} challenges={this.state.challenges}/>
                </>
                }
                {this.state.info.length == 0 &&
                    <h1>Nothing loaded yet!</h1>
                }
                </div>
            );
        else
            return (<LoadingView />);
    }
}

export default SubmittedSol;