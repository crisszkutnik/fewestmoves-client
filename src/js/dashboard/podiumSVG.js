import React from "react";

const PodiumSVG = (props) => {
	let nFirst, sFirst, nSecond, sSecond, nThird, sThird;

	[nFirst, ...sFirst] = props.first.name.split(" ");
	[nSecond, ...sSecond] = props.second.name.split(" ");
	[nThird, ...sThird] = props.third.name.split(" ");

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="800"
			height="444"
			fill="none"
			viewBox="0 0 600 444"
		>
			<path
				fill="#8B9094"
				d="M0 272l12.5-21.651h25L50 272l-12.5 21.651h-25L0 272z"
			></path>
			<path
				fill="#A06652"
				d="M550 314l12.5-21.651h25L600 314l-12.5 21.651h-25L550 314z"
			></path>
			<path
				fill="#A06652"
				d="M525 314l12.5-21.651h25L575 314l-12.5 21.651h-25L525 314z"
			></path>
			<path
				fill="#A06652"
				d="M330 314l67.5-21.651h135L600 314l-67.5 21.651h-135L330 314z"
			></path>
			<path
				fill="#A06652"
				d="M501 314l12.5-21.651h25L551 314l-12.5 21.651h-25L501 314z"
			></path>
			<path
				fill="#8B9094"
				d="M24 272l12.5-21.651h25L74 272l-12.5 21.651h-25L24 272z"
			></path>
			<path
				fill="#8B9094"
				d="M40 272l12.5-21.651h25L90 272l-12.5 21.651h-25L40 272z"
			></path>
			<path
				fill="#8B9094"
				d="M2 272l71.25-21.651h142.5L287 272l-71.25 21.651H73.25L2 272z"
			></path>
			<path
				fill="#F0B30B"
				d="M200 154l50-21.651h100L400 154l-50 21.651H250L200 154z"
			></path>
			<path fill="#FEC223" d="M200 154H400V444H200z"></path>
			<path fill="#BB7760" d="M400 314H600V444H400z"></path>
			<path fill="#A0A7AD" d="M0 272H200V444H0z"></path>
			<path fill="#A0A7AD" d="M0 272H200V444H0z"></path>
			<text
				fill="#fff"
				fontFamily="Roboto"
				fontSize="60"
				fontWeight="900"
				letterSpacing="0em"
			>
				<tspan x="283" y="230.508">
					1
				</tspan>
			</text>
			<text
				fill="#fff"
				fontFamily="Roboto"
				fontSize="60"
				fontWeight="900"
				letterSpacing="0em"
			>
				<tspan x="489" y="378.508">
					3
				</tspan>
			</text>
			<text
				fill="#fff"
				fontFamily="Roboto"
				fontSize="48"
				letterSpacing="0em"
				textAnchor="middle"
			>
				<tspan x="6%" y="38%">
					{nSecond}
				</tspan>
				<tspan x="6%" y="50%">
					{sSecond}
				</tspan>
			</text>
			<text
				fill="#fff"
				fontFamily="Roboto"
				fontSize="48"
				letterSpacing="0em"
				textAnchor="middle"
			>
				<tspan x="50%" y="11%">
					{nFirst}
				</tspan>
				<tspan x="50%" y="23%">
					{sFirst}
				</tspan>
			</text>
			<text
				fill="#fff"
				fontFamily="Roboto"
				fontSize="60"
				fontWeight="900"
				letterSpacing="0em"
			>
				<tspan x="84" y="343.508">
					2
				</tspan>
			</text>
			<text
				fill="#fff"
				fontFamily="Roboto"
				fontSize="48"
				letterSpacing="0em"
				textAnchor="middle"
			>
				<tspan x="93%" y="46%">
					{nThird}
				</tspan>
				<tspan x="93%" y="58%">
					{sThird}
				</tspan>
			</text>
		</svg>
	);
};

export default PodiumSVG;
