import React from "react";
import arrow from "../../img/arrow.svg";

const BackButton = (props) => {
	return (
		<div id="back-button" onClick={props.redFunc}>
			<img src={arrow} alt="arrow" />
			<h1>Return to home page</h1>
		</div>
	);
};

export default BackButton;
