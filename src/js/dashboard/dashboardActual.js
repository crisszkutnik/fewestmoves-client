import React from "react";
import "../../css/dashboardActual.css";
import LoadingView from "../general_purpose/loadingView";
import ChallengeCard from "./challengeCard";
import LoginPanel from "../navbar_login/loginPanel";
import Podium from "./podium";

class DashboardActual extends React.Component {
	constructor() {
		super();
		this.state = {
			userResponse: {},
			loaded: false,
			showLogin: false,
			topThree: [],
			showPositions: true
		};
		this.showLogin = this.showLogin.bind(this);
	}

	componentDidMount() {
		let fetch1 = "/challData/getChallengeData";
		let fetch2 = "/prevRes/topThree";

		let headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			credentials: "include",
		};

		Promise.all([fetch(fetch1, headers), fetch(fetch2, headers)])
			.then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
			.then(([data1, data2]) => {
				this.setState({
					userResponse: data1,
					topThree: data2,
					loaded: true,
				});
			});
	}

	showLogin() {
		this.setState({
			showLogin: this.state.showLogin ? false : true,
		});
	}

	render() {
		if (this.state.loaded)
			return (
				<>
					{this.state.showPositions &&
					<Podium closePanel={() => this.setState({ showPositions: false })} user={ this.props.user } places={this.state.topThree} /> }
					{this.state.showLogin && (
						<LoginPanel closePanel={this.showLogin} />
					)}
					<div id="dashboardActual" style={{ overflow: "hidden" }}>
						<div id="header">
							<h1>Take a look at this week's scrambles</h1>
						</div>
						<div
							id="challenges"
							className="fade-in"
							style={{ overflow: "hidden" }}
						>
							<ChallengeCard
								showLogin={this.showLogin}
								isLogged={this.props.user.logged}
								comb={1}
								solMoves={this.state.userResponse.comb1.moves}
								startDate={this.state.userResponse.comb1.startDate}
							/>
							<ChallengeCard
								showLogin={this.showLogin}
								isLogged={this.props.user.logged}
								comb={2}
								solMoves={this.state.userResponse.comb2.moves}
								startDate={this.state.userResponse.comb2.startDate}
							/>
							<ChallengeCard
								showLogin={this.showLogin}
								isLogged={this.props.user.logged}
								comb={3}
								solMoves={this.state.userResponse.comb3.moves}
								startDate={this.state.userResponse.comb3.startDate}
							/>
						</div>
					</div>
				</>
			);
		else return <LoadingView />;
	}
}

export default DashboardActual;
