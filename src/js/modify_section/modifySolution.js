import React from "react";
import LoadingView from "../general_purpose/loadingView";
import ScrambleTime from "./scrambleTime";
import ModifyForm from "./modifyForm";
import { Container, Row, Col } from "react-bootstrap";
import BackButton from "./backButton";

class ModifySolution extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			resData: {},
			scramble: "",
			loaded: false,
			redirectHome: false,
		};

		this.timerControl = this.timerControl.bind(this);
		this.updateTime = this.updateTime.bind(this);

		this.headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ reqComb: this.props.match.params.comb }),
		};
	}

	updateTime() {
		Promise.all([
			fetch("/challData/activeChallengeData", this.headers),
			fetch("/challData/getScramble", this.headers),
		])
			.then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
			.then(([resData, scramble]) => {
				let time = Date.now();
				let endTime = resData.startDate + 3.6e6;

				let timeLeft = endTime - time;

				let minutes = Math.floor(timeLeft / 60000);

				this.setState({
					resData,
					scramble,
					minutes,
					seconds: Math.round(timeLeft / 1000 - minutes * 60),
					loaded: true,
					timeLeft,
				});
			})
			.catch(() => alert("An error ocurred"));
	}

	componentWillMount() {
		this.updateTime();

		this.setState({
			interval_update: setInterval(this.updateTime, 660000),
			interval_timerControl: setInterval(this.timerControl, 1000),
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.interval_update);
		clearInterval(this.state.interval_timerControl);
	}

	timerControl() {
		if (this.state.seconds !== 0)
			this.setState({ seconds: this.state.seconds - 1 });
		else
			this.setState({ seconds: 59, minutes: this.state.minutes - 1 });
	}

	render() {
		if (!this.state.loaded) return <LoadingView />;
		else
			return (
				<div id="modify-challenge">
					<BackButton redFunc={() => this.setState({ redirectHome: true })} />
					<Container id="modify-container">
						<Row>
							<Col
								className="page-card page-card-top-left mb-2"
								lg="6"
								md="12"
							>
								<ScrambleTime
									minutes={this.state.minutes}
									seconds={this.state.seconds}
									scramble={this.state.scramble}
								/>
							</Col>
							<Col
								className="page-card page-card-top-right mb-2"
								lg="5"
								md="12"
							>
								<scramble-display
									scramble={this.state.scramble}
								></scramble-display>
							</Col>
						</Row>
						<Row>
							<Col
								id="bottom-container"
								className="page-card page-card-bottom"
								lg="11"
								md="12"
							>
								<ModifyForm
									redirectHome={this.state.redirectHome}
									timeLeft={this.state.timeLeft}
									reqComb={this.props.match.params.comb}
									modifySol={true}
									sol={this.state.resData.sol}
									explanation={this.state.resData.explanation}
									scramble={this.state.scramble}
								/>
							</Col>
						</Row>
					</Container>
				</div>
			);
	}
}

export default ModifySolution;
