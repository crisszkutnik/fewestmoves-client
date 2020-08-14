import React from 'react'
import LoadingView from '../general_purpose/loadingView'
import UserSolutions from '../general_purpose/userSolutions'
import 'simplebar/dist/simplebar.min.css';
import NormalTable from './normalTable'
import ResponsiveTable from './responsiveTable'

class PrevResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            resData: [],
            fetchedData: false,
            display: 0,
            width: window.innerWidth
        };

		this.getMore = this.getMore.bind(this);
        this.displayTable = this.displayTable.bind(this);
        this.configResize = this.configResize.bind(this);
        this.configScroll = this.configScroll.bind(this);

        this.fetch1 = '/prevRes';
        this.fetch2 = '/challData/getAllScrambles';

        this.headers = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        };
    }

    componentWillMount() {
        Promise.all([fetch(this.fetch1, this.headers), fetch(this.fetch2, this.headers)])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([responses, rChallenges]) => {
            setTimeout(() => this.setState({resData: this.state.resData.concat(responses), fetchedData: true, challenges: rChallenges}), 400);
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.configResize);
        window.addEventListener('scroll', this.configScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.configResize);
        window.removeEventListener('scroll', this.configScroll);
    }

    configScroll() {
        // For desktop only

        if(this.state.width >= 1200 && this.state.fetchedData) {
            let containerHeight = document.getElementById("prev-results").offsetHeight;
            let userSol = document.getElementById("display-all");
    
            if(containerHeight > 1080) {
                let scroll = window.pageYOffset;
                let table = document.getElementsByTagName("table")[0];
                let height = userSol.offsetHeight;

                if(scroll + height >= table.offsetHeight + 56)
                    userSol.style.bottom = parseFloat(window.getComputedStyle(table).getPropertyValue("margin-bottom")) + 130 + 'px';
                else
                    userSol.style.bottom = "";
            } else {
                userSol.style.position = "absolute";
            }
        }
    }

    configResize() {
        this.setState({
            width: window.innerWidth
        });
    }

    getMore() {
        fetch('/prevRes/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({skip: this.state.resData.length})
        })
        .then(res => res.json())
        .then(data => {
            if(data.length === 0)
                alert('Nothing else to show :(');
            else
                this.setState({resData: this.state.resData.concat(data)});
        })
        .catch(e => alert('Critical error :('));
    }

    displayTable() {
        if(this.state.width < 1200)
         return (
				<ResponsiveTable changeDisplay={(n) => this.setState({display: n})} data={this.state.resData} getMore={this.getMore} display={this.state.display}/>
         );
        else
         return (
				<NormalTable changeDisplay={(n) => this.setState({display: n})} data={this.state.resData} getMore={this.getMore} display={this.state.display}/>
			);
    }

    render() {
        if(this.state.fetchedData)
            return (
               <div id='prev-results'>
				    {this.displayTable()}
                    <UserSolutions userSol={this.state.resData[this.state.display]} challenges={this.state.challenges}/>
               </div>
            );
        else
            return (<LoadingView />);
    }
}

export default PrevResults;