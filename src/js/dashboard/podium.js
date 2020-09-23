import React, { useEffect, useState } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Podium = (props) => {
	const history = useHistory();
	let isWinner = props.userPosition <= 3;

	const [text, setText] = useState("");

	const position = (pos) => {
		if (pos === 1) return "1st";
		else if (pos === 2) return "2nd";
		else if (pos === 3) return "3rd";
		else return `${pos}th`;
	};

	const table = () => {
		let res = [];

		props.places.forEach((e) => {
			let className;

			if (e.position === 1) className = "first-color";
			else if (e.position === 2) className = "second-color";
			else className = "third-color";

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

	//let text;

	useEffect(() => {
		fetch("/prevRes/userPosition", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			credentials: "include",
		})
			.then((res) => res.json())
			.then((userPosition) => {
				if (userPosition === -1) {
					setText(
						<>
							<h4>You did not participate last week!</h4>
							<h4>Be sure to complete each scramble before Sunday</h4>
						</>
					);
				} else {
					if (isWinner) {
						setText(
							<h4>
								Congratulations! You ended up on{" "}
								{position(props.userPosition)} place
							</h4>
						);
					} else {
						setText(
							<>
								<h4>
									You ended up on {position(props.userPosition)} place
									:(
								</h4>
								<h4>Better luck this week!</h4>
							</>
						);
					}
				}
			});
	}, []);

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
				<Row>{text}</Row>
				<Row>
					<p onClick={props.closePanel}>Close</p>
					<p onClick={() => history.push("/dashboard/results")}>
						Check all results
					</p>
				</Row>
			</Container>
		</div>
	);
};

export default Podium;
