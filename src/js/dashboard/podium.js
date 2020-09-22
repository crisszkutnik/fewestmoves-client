import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Podium = (props) => {
	const history = useHistory();
	let isWinner = false;

	const table = () => {
		let res = [];

		props.places.forEach((e) => {
			let className;

			if (e.position === 1) className = "first-color";
			else if (e.position === 2) className = "second-color";
			else className = "third-color";

			if (e.name === props.user.name) isWinner = true;

			res.push(
				<tr className={className}>
					<td>{e.name}</td>
					<td>{e.average % 1 === 0 ? e.average : e.average.toFixed(1)}</td>
					<td>{e.lowest}</td>
				</tr>
			);
		});

		return res;
	};

	return (
		<div id="topThree-bg">
			<Container id="topThree">
				<Row>
					<h1>Week finished! The winners are...</h1>
				</Row>
				<Row>
					<Table>
						<tbody>{table()}</tbody>
					</Table>
				</Row>
				<Row>
					{isWinner ? (
						<h4>Congratulations! You made it to the top 3</h4>
					) : (
						<>
							<h4>You didn't make it to the top 3 :(</h4>
							<h4>Better luck this week!</h4>
						</>
					)}
				</Row>
				<Row>
					<p onClick={ props.closePanel }>
						Close
					</p>
					<p onClick={() => history.push("/dashboard/results")}>
						Check all results
					</p>
				</Row>
			</Container>
		</div>
	);
};

export default Podium;
