import React from "react";
import { isSolved } from "../../functions/cubeSolve";
import { Redirect } from "react-router-dom";
import correctIMG from "../../img/tick.svg";
import incorrectIMG from "../../img/incorrect.svg";
import SavingView from "./savingView"

class ModifyForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.saveData = this.saveData.bind(this);
		this.saveStatus = this.saveStatus.bind(this);
		this.redirectHome = this.redirectHome.bind(this);

		this.state = {
			solution: this.props.sol,
			explanation: this.props.explanation,
			savedSol: this.props.sol,
			savedExp: this.props.explanation,
		};
	}

	componentDidMount() {
		// every 5 minutes
		this.setState({
			interval: setInterval(this.saveData, 300000),
		});

		if (this.props.modifySol) {
			// Save and send when there is no time left
			this.setState({
				timeout: setTimeout(() => {
					this.saveData();
					this.setState({ redirect: true });
				}, this.props.timeLeft),
			});
		}
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);

		if (this.props.modifySol) 
			clearTimeout(this.state.timeout);
	}

	handleChange(e) {
		let target = e.target;
		let str = target.value;

		if (target.name !== "solution" || this.props.modifySol) {
			// Parse the solution
			if (target.name === "solution")
				str = str
					.replace(/^\s/gm, "")
					.replace(/\s\s+/gm, " ")
					.replace(/’/gm, "'");

			this.setState({
				[target.name]: str,
			});
		}
	}

	saveData() {
		return new Promise((resolve, reject) => {
			let modComb = {};

			if (this.props.modifySol) modComb.sol = this.state.solution.trim();

			modComb.explanation = this.state.explanation;

			let save = {
				modComb,
				reqComb: this.props.reqComb,
			};

			let fetchAll = "/challData/modifyChallenge";
			let fetchExp = "/challData/modifyExplanation";

			fetch(this.props.modifySol ? fetchAll : fetchExp, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				credentials: "include",
				body: JSON.stringify(save),
			})
				.then(() => {
					let changeState = {
						savedExp: save.modComb.explanation,
					};

					if (this.props.modifySol) changeState.savedSol = save.modComb.sol;

					this.setState(changeState);

					resolve();
				})
				.catch(() => {
					alert("An error ocurred");
					reject();
				});
		})
	}

	saveStatus() {
		if (
			this.state.solution === this.state.savedSol &&
			this.state.explanation === this.state.savedExp
		)
			return (
				<>
					<img alt="Saved" src={correctIMG} />
					<p style={{ color: "var(--ok-green)" }}>Solution saved</p>
				</>
			);
		else
			return (
				<>
					<img alt="Not saved" src={incorrectIMG} />
					<p style={{ color: "var(--incorrect-red)" }}>
						Solution not saved!
					</p>
					<button onClick={this.saveData}>Save now</button>
				</>
			);
	}

	redirectHome() {
		this.saveData()
		.then(() => this.setState({ redirect: true }));

		return <SavingView />
	}

	render() {
		let moves = isSolved(this.props.scramble, this.state.solution.trim());

		return (
			<div>
				{this.props.redirectHome && this.redirectHome()}
				<form>
					<label htmlFor="solution">Solution</label>
					<div id="sol-input">
						<input
							id="solution"
							className="inputField"
							name="solution"
							type="text"
							onChange={this.handleChange}
							value={this.state.solution}
						/>
						<div className="moves">
							<span>{moves === -1 ? "DNF" : moves}</span>
						</div>
					</div>
					<label htmlFor="explanation">Explanation</label>
					<textarea
						spellCheck="false"
						className="inputField"
						name="explanation"
						onChange={this.handleChange}
						value={this.state.explanation}
					></textarea>
				</form>
				<div id="save-status">{this.saveStatus()}</div>
				{this.state.redirect && <Redirect to="/dashboard/actual" />}
			</div>
		);
	}
}

export default ModifyForm;
