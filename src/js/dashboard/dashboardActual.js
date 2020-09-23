import React from "react";
import Cookies from "universal-cookie";
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
			topThree: []
		};
		this.showLogin = this.showLogin.bind(this);
	}

	componentDidMount() {
		let fetch1 = "/challData/getChallengeData";
		let fetch2 = "/prevRes/topThree";
		let fetch3 = "/challData/weekStartDate";

		let headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			credentials: "include",
		};

		Promise.all([fetch(fetch1, headers), fetch(fetch2, headers), fetch(fetch3, headers)])
			.then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
			.then(([data1, data2, data3]) => {
				let cookies = new Cookies();
				let showWinners = false;

				if(!cookies.get("alreadyEntered")) {
					showWinners = true;
					cookies.set("alreadyEntered", true, { maxAge: (data3.startDate + 6.048e+8 - Date.now()) / 1000 });
				}

				this.setState({
					userResponse: data1,
					topThree: data2,
					showWinners,
					loaded: true
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
					{this.state.showWinners &&
					<Podium closePanel={() => this.setState({ showPositions: false })} places={this.state.topThree} /> }
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
