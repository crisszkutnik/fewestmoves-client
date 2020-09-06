import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { hasTime } from "../../functions/func";
import correctIMG from "../../img/tick.svg";
import incorrectIMG from "../../img/incorrect.svg";
import notLoadedIMG from "../../img/exclamation.svg";
import { Redirect } from "react-router-dom";

const ConfirmationPanel = (props) => {
	const [redirect, setRedirect] = useState(false);

	const startChallenge = () => {
		fetch("/challData/startChallenge", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ reqComb: `comb${props.comb}` }),
		}).then(() => setRedirect(true));
	};

	return (
		<div className="black-background">
			<div className="scramble-alert">
				<div id="conf-text">
					<p>
						<strong>Be careful!</strong> Once you start you will have one
						hour to submit your solution.
					</p>
					<span>Are you sure you want to continue?</span>
				</div>
				<div id="conf-button">
					<button onClick={startChallenge}>Continue</button>
					<button onClick={props.closePanel}>Cancel</button>
					<p>
						<strong>Note:</strong> your solution is saved automatically
						every 5 minutes, but make sure to click on "Save solution" if
						you return to the Homepage and it's unsaved!
					</p>
				</div>
			</div>
			{redirect && <Redirect to={`/modifySolution/comb${props.comb}`} />}
		</div>
	);
};

class NoTimeLeft extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirectComponent: "",
		};
	}

	componentDidMount() {
		let slide_duration = 0.25;
		let on_screen = 10;

		let elem = document.getElementById("progress-slider");
		let container = document.getElementById("no-time-warning");

		elem.classList.add("progress-expand");
		this.slideInTimeout = setTimeout(
			() => container.classList.add("slide-out-right"),
			(on_screen + slide_duration) * 1000
		);
		// Dissapear after animation
		this.closeTimeout = setTimeout(
			this.props.closePanel,
			(on_screen + 2 * slide_duration) * 1000
		);
	}

	componentWillUnmount() {
		clearTimeout(this.slideInTimeout);
		clearTimeout(this.closeTimeout);
	}

	render() {
		let redirect1 = (
			<Redirect to={`/modifyExplanation/comb${this.props.comb}`} />
		);

		return (
			<div id="no-time-warning" className="slide-in-right">
				<div id="no-time-button">
					<div id="progress-slider"></div>
					<button onClick={this.props.closePanel}>X</button>
				</div>
				<div id="no-time-text">
					<p>
						<strong>You do not have time left!</strong> However, you can
						still...
					</p>
					<div>
						<button
							onClick={() =>
								this.setState({ redirectComponent: redirect1 })
							}
						>
							Modify explanation and see your solution
						</button>
					</div>
				</div>
				{this.state.redirectComponent}
			</div>
		);
	}
}

class ChallengeCard extends React.Component {
	constructor(props) {
		super(props);
		this.modifyRes = this.modifyRes.bind(this);
		this.expandAdd = this.expandAdd.bind(this);
		this.expandRemove = this.expandRemove.bind(this);
		this.clickedButton = this.clickedButton.bind(this);

		// Must change this later
		this.state = { showConf: false };
	}

	expandAdd() {
		document
			.getElementById(`scramble${this.props.comb}`)
			.classList.add("card-expand-hover");
	}

	expandRemove() {
		document
			.getElementById(`scramble${this.props.comb}`)
			.classList.remove("card-expand-hover");
	}

	componentDidMount() {
		//Animation setup

		document
			.getElementById(`load-sol-button${this.props.comb}`)
			.addEventListener("mouseenter", this.expandAdd);
		document
			.getElementById(`load-sol-button${this.props.comb}`)
			.addEventListener("mouseout", this.expandRemove);
	}

	componentWiilUnmount() {
		document
			.getElementById(`load-sol-button${this.props.comb}`)
			.removeEventListener("mouseenter", this.expandAdd);
		document
			.getElementById(`load-sol-button${this.props.comb}`)
			.removeEventListener("mouseout", this.expandRemove);
	}

	clickedButton() {
		if (!this.props.isLogged) this.props.showLogin();
		else this.setState({ showConf: true });
	}

	modifyRes() {
		if (this.props.startDate === 0)
			return (
				<ConfirmationPanel
					comb={this.props.comb}
					closePanel={() => this.setState({ showConf: false })}
				/>
			);
		else if (hasTime(this.props.startDate))
			return <Redirect to={`/modifySolution/comb${this.props.comb}`} />;
		else
			return (
				<NoTimeLeft
					closePanel={() => this.setState({ showConf: false })}
					comb={this.props.comb}
				/>
			);
	}

	render() {
		let showClass = `text-white text-center solution-card px-2`;
		let text;
		let moves;
		let image;
		let btnText;

		// Button text
		if (this.props.solMoves === 0) btnText = "Start!";
		else btnText = "Edit";

		// Card content (title, number, class)
		if (this.props.solMoves === 0 && this.props.startDate === 0) {
			text = "No result yet";
			showClass += " sol-not-loaded";
			moves = "DNS";
			image = <img alt="Exclamation sign" src={notLoadedIMG}></img>;
		} else if (this.props.solMoves > 0) {
			text = "Correct solution";
			showClass += " sol-loaded";
			moves = this.props.solMoves;
			image = <img alt="Correct solution" src={correctIMG}></img>;
		} else {
			text = "Incorrect solution";
			showClass += " sol-incorrect";
			moves = "DNF";
			image = <img alt="Incorrect solution" src={incorrectIMG}></img>;
		}

		return (
			<>
				{this.state.showConf && this.modifyRes()}
				<Container className={showClass} id={`scramble${this.props.comb}`}>
					<Row className="sol-status">
						<Col className="sol-status-info">
							{image}
							<p>{text}</p>
						</Col>
					</Row>
					<Row className="sol-moves">
						<Col>
							<h2>{moves}</h2>
							<br />
							{moves >= 0 && <span>moves</span>}
						</Col>
					</Row>
					<Row className="sol-button">
						<Col>
							<button
								id={`load-sol-button${this.props.comb}`}
								onClick={this.clickedButton}
							>
								{btnText}
							</button>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default ChallengeCard;
