class Cube {
	constructor(){
		this.state = { //definition of each piece
			cp: [0,1,2,3,4,5,6,7], //UBL, UBR, UFR, UFL, DFL, DFR, DBR, DBL
			co: [0,0,0,0,0,0,0,0],//clockwise = +1
			ep: [0,1,2,3,4,5,6,7,8,9,10,11], //UB, UR, UF, UL, BL, BR, FR, FL, DF, DR, DB, DL
			eo: [0,0,0,0,0,0,0,0,0,0,0,0], //1 = flipped
			xp: [0,1,2,3,4,5] //U, L, F, R, B, D
		};
	}
	applyManeuver(maneuver){ //apply a sequence of moves to the cube state
		for(let i=0; i<maneuver.length; i++){
			this.moveOf(maneuver[i]);
		}
	}
	moveOf(move){
		if(move=="R") this.R();
		if(move=="U") this.U();
		if(move=="F") this.F();
		if(move=="L") this.L();
		if(move=="D") this.D();
		if(move=="B") this.B();
		if(move=="x") this.x();
		if(move=="y") this.y();
		if(move=="z") this.z();
	}

	//DEFINITION OF MOVES//
	R(){
		let cp = this.state.cp;
		let co = this.state.co;
		let ep = this.state.ep;
		let eo = this.state.eo;
		[cp[1],cp[2],cp[5],cp[6]] = [cp[2],cp[5],cp[6],cp[1]];
		[co[1],co[2],co[5],co[6]] = [co[2],co[5],co[6],co[1]];
		[ep[1],ep[5],ep[6],ep[9]] = [ep[6],ep[1],ep[9],ep[5]];
		[eo[1],eo[5],eo[6],eo[9]] = [eo[6],eo[1],eo[9],eo[5]];
		co[1] = (co[1]+1)%3;
		co[2] = (co[2]+2)%3;
		co[5] = (co[5]+1)%3;
		co[6] = (co[6]+2)%3;
	}
	U(){
		let cp = this.state.cp;
		let co = this.state.co;
		let ep = this.state.ep;
		let eo = this.state.eo;
		[cp[0],cp[1],cp[2],cp[3]] = [cp[3],cp[0],cp[1],cp[2]];
		[co[0],co[1],co[2],co[3]] = [co[3],co[0],co[1],co[2]];
		[ep[0],ep[1],ep[2],ep[3]] = [ep[3],ep[0],ep[1],ep[2]];
		[eo[0],eo[1],eo[2],eo[3]] = [eo[3],eo[0],eo[1],eo[2]];
	}
	F(){
		let cp = this.state.cp;
		let co = this.state.co;
		let ep = this.state.ep;
		let eo = this.state.eo;
		[cp[2],cp[3],cp[4],cp[5]] = [cp[3],cp[4],cp[5],cp[2]];
		[co[2],co[3],co[4],co[5]] = [co[3],co[4],co[5],co[2]];
		[ep[2],ep[6],ep[7],ep[8]] = [ep[7],ep[2],ep[8],ep[6]];
		[eo[2],eo[6],eo[7],eo[8]] = [eo[7],eo[2],eo[8],eo[6]];
		co[2] = (co[2]+1)%3;
		co[3] = (co[3]+2)%3;
		co[4] = (co[4]+1)%3;
		co[5] = (co[5]+2)%3;

		eo[2] = (eo[2]+1)%2;
		eo[6] = (eo[6]+1)%2;
		eo[7] = (eo[7]+1)%2;
		eo[8] = (eo[8]+1)%2;
	}
	x(){
		let cp = this.state.cp;
		let co = this.state.co;
		let ep = this.state.ep;
		let eo = this.state.eo;
		let xp = this.state.xp;
		[cp[0],cp[1],cp[2],cp[3],cp[4],cp[5],cp[6],cp[7]] = [cp[3],cp[2],cp[5],cp[4],cp[7],cp[6],cp[1],cp[0]];
		[co[0],co[1],co[2],co[3],co[4],co[5],co[6],co[7]] = [co[3],co[2],co[5],co[4],co[7],co[6],co[1],co[0]];
		[ep[0],ep[1],ep[2],ep[3],ep[4],ep[5],ep[6],ep[7],ep[8],ep[9],ep[10],ep[11]] = [ep[2],ep[6],ep[8],ep[7],ep[3],ep[1],ep[9],ep[11],ep[10],ep[5],ep[0],ep[4]];
		[eo[0],eo[1],eo[2],eo[3],eo[4],eo[5],eo[6],eo[7],eo[8],eo[9],eo[10],eo[11]] = [eo[2],eo[6],eo[8],eo[7],eo[3],eo[1],eo[9],eo[11],eo[10],eo[5],eo[0],eo[4]];
		[xp[0],xp[1],xp[2],xp[3],xp[4],xp[5]] = [xp[2],xp[1],xp[5],xp[3],xp[0],xp[4]];
		co[0] = (co[0]+2)%3;
		co[1] = (co[1]+1)%3;
		co[2] = (co[2]+2)%3;
		co[3] = (co[3]+1)%3;
		co[4] = (co[4]+2)%3;
		co[5] = (co[5]+1)%3;
		co[6] = (co[6]+2)%3;
		co[7] = (co[7]+1)%3;

		eo[0] = (eo[0]+1)%2;
		eo[2] = (eo[2]+1)%2;
		eo[8] = (eo[8]+1)%2;
		eo[10] = (eo[10]+1)%2;
	}
	y(){
		let cp = this.state.cp;
		let co = this.state.co;
		let ep = this.state.ep;
		let eo = this.state.eo;
		let xp = this.state.xp;
		[cp[0],cp[1],cp[2],cp[3],cp[4],cp[5],cp[6],cp[7]] = [cp[3],cp[0],cp[1],cp[2],cp[5],cp[6],cp[7],cp[4]];
		[co[0],co[1],co[2],co[3],co[4],co[5],co[6],co[7]] = [co[3],co[0],co[1],co[2],co[5],co[6],co[7],co[4]];
		[ep[0],ep[1],ep[2],ep[3],ep[4],ep[5],ep[6],ep[7],ep[8],ep[9],ep[10],ep[11]] = [ep[3],ep[0],ep[1],ep[2],ep[7],ep[4],ep[5],ep[6],ep[9],ep[10],ep[11],ep[8]];
		[eo[0],eo[1],eo[2],eo[3],eo[4],eo[5],eo[6],eo[7],eo[8],eo[9],eo[10],eo[11]] = [eo[3],eo[0],eo[1],eo[2],eo[7],eo[4],eo[5],eo[6],eo[9],eo[10],eo[11],eo[8]];
		[xp[0],xp[1],xp[2],xp[3],xp[4],xp[5]] = [xp[0],xp[2],xp[3],xp[4],xp[1],xp[5]];

		eo[4] = (eo[4]+1)%2;
		eo[5] = (eo[5]+1)%2;
		eo[6] = (eo[6]+1)%2;
		eo[7] = (eo[7]+1)%2;
	}
	z(){
		this.y(); this.y(); this.y(); this.x(); this.y();
	}
	L(){
		this.y(); this.y(); this.R(); this.y(); this.y();
	}
	D(){
		this.x(); this.x(); this.U(); this.x(); this.x();
	}
	B(){
		this.y(); this.R(); this.y(); this.y(); this.y();
	}
}
//end of Cube class

function wideEquivalent(move){ //convert Rw to L x, etc
	if(move=="R") return "Lx";
	if(move=="U") return "Dy";
	if(move=="F") return "Bz";
	if(move=="L") return "Rxxx";
	if(move=="D") return "Uyyy";
	if(move=="B") return "Fzzz";
}

function parseMove(move){ //convert any move into just string of {F,B,U,L,R,D,x,y,z}
	if (move[1]=="'"){ //F', B', etc
		return move[0]+move[0]+move[0];
	}
	else if (move[1]=="2"){ //F2, B2, etc
		return move[0]+move[0];
	}
	else if (move[1] == "w"){ //move is wide
		if(move.length == 2){ //Fw, Bw...
			return wideEquivalent(move[0]);
		}
		else if(move.length == 3 && move[2]=="2"){ //Fw2, Bw2...
			return wideEquivalent(move[0]) + wideEquivalent(move[0]);
		}
		else if(move.length == 3 && move[2]=="'"){ //Fw', Bw'...
			return wideEquivalent(move[0]) + wideEquivalent(move[0]) + wideEquivalent(move[0]);
		}
	}
	else if (move.length == 1 && validChars(move)){ //F, B, U, D, R, L, x, y, z
		return move[0];
	}
	else if(!validChars(move)){
		return "error"; //incorrect character
	}
	else{ //if user is too dumb and found a new way to break it
		return "error";
	}
}

function validChars(move){ //sorry for the ugly syntax
	if(!(move.includes("F")||move.includes("B")||move.includes("R")||move.includes("L")||move.includes("U")||move.includes("D")||move.includes("x")||move.includes("y")||move.includes("z"))){
		return false;
	}
	return true;
}

function simplifyManeuver(scramble){ //convert any *sequence* into just string of {F,B,U,L,R,D,x,y,z}
	for(let i=0; i<scramble.length; i++){
		scramble[i] = parseMove(scramble[i]);
	}
	return scramble.join("");
}

function arrEq(arr1, arr2){ //to compare arrays
	for(let i=0; i<arr1.length; i++){
		if (arr1[i]!=arr2[i]) return false;
	}
	return true;
}

function checkSymmetries(c1,c2){ //checking solved state for every possible orientation @LeoCruz
	let syms = ["","y","yy","yyy",
				"x","xy","xyy","xyyy",
				"xx","xxy","xxyy","xxyyy",
				"xxx","xxxy","xxxyy","xxxyyy",
				"z","zy","zyy","zyyy",
				"zzz","zzzy","zzzyy","zzzyyy"];
	let syms_prime = ["","yyy","yy","y",
						"xxx","yyyxxx","yyxxx","yxxx",
						"xx","yyyxx","yyxx","yxx",
						"x","yyyx","yyx","yx",
						"zzz","yyyzzz","yyzzz","yzzz",
						"z","yyyz","yyz","yz",]
	//console.log(c2.state);
	//console.log(c2.applyManeuver("y"));
	for (let i=0; i<24; i++){
		c1.applyManeuver(syms[i]);
		if(statesAreEqual(c1.state,c2.state)) return true;
		c1.applyManeuver(syms_prime[i]);
	}
	return false;
}

function statesAreEqual(s1,s2){ //comparison of cube.state objects
	return (arrEq(s1.cp,s2.cp)) && (arrEq(s1.co,s2.co)) && (arrEq(s1.ep,s2.ep)) && (arrEq(s1.eo,s2.eo)) && (arrEq(s1.xp,s2.xp));
}

function solLength(solution){ //length of solution (x,y,z = 0, others = 1)
	let rots = 0;
	for(let i=0; i<solution.length; i++){
		if(solution[i]=="" || solution[i].includes("x") || solution[i].includes("y") || solution[i].includes("z")){
			rots++;
		}
	}

	return (solution.length) - rots;
}

// "MAIN" FUNCTION //
// returns solution length if valid,
// -1 otherwise
export function isSolved(scramble, solution){
	let cube = new Cube();
	let solvedCube = new Cube();

	let parsedSolution = simplifyManeuver(solution.split(" "));
	let parsedScramble = simplifyManeuver(scramble.split(" "));
	cube.applyManeuver(parsedScramble);
	cube.applyManeuver(parsedSolution);
	//console.log(cube.state);
	//console.log(solvedCube.state);
	//console.log(solution.split(" "));

	let output;
	if(!parsedSolution.includes("error") && checkSymmetries(cube, solvedCube)){
		output = solLength(solution.split(" "));
	}
	else output=-1;

	return output;
}
