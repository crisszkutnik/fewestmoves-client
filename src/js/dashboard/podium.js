import React from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom"

const Podium = (props) => {
	const history = useHistory();
	let isWinner = false;

	const table = () => {
		let res = [];

		props.places.forEach(e => {
			let className;

			if(e.position === 1)
				className = "first-color"
			else if(e.position === 2)
				className = "second-color"
			else
				className = "third-color"

			if(e.name === props.user.name)
				isWinner = true;

			res.push(
				<tr className={className}>
					<td>{ e.name }</td>
					<td>{ e.average }</td>
					<td>{ e.lowest }</td>
				</tr>
			)
		});

		return res;
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", color: "white" }}>
			<h1>Week finished! The winners are...</h1>
			<Table>
				<tbody>
					{table()}
				</tbody>
			</Table>

			{ isWinner ? 
			<h2>Congratulations! You made it to the top 3</h2> : 
			(
				<>
				<h2>You didn't make it to the top 3 :(</h2>
				<h2>Better luck this week!</h2>
				</>
			)
			}

			<p onClick={() => history.push("/dashboard/results")}>Check all results!</p>
		</div>
	);
};

export default Podium;
