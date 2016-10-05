/*
 * Created by: Luis Juan Sanchez, 04/09/2016
 *
 * Chess.js extension to add heuristic ah expansion functionallity
 *
 * Exported function: returns a custom Chess Object
 * 
 * Added functions:
 *	getChildren: returns the posible chess states to reach by a single move
 *		chess - current chess object
 *	terminal: returns if the game is over
 *		chess - current chess object
 *	utiluty: evaluates the current utility based on the board position
 *		chess - current chess object
 */


var Chess = require('chess.js').Chess;

var getChildren = function (chess) {
	var nodes = [];
	var moves = chess.moves();
	for (var i = 0; i < moves.length; i++) {
		var temp = new Chess(chess.fen());
		temp.last = moves[i];
		temp.baseTurn = chess.baseTurn;
		temp.move(moves[i]);
		nodes.push(temp);
	};
	return nodes;
}

var terminal = function (chess) {
	return chess.game_over();
}

var utility = function (chess) {
	if(chess.game_over()){
		if(chess.in_draw()) return 0;
		if (chess.turn() == chess.baseTurn) return -1000;
		else return 1000;
	}
	var fenstr = chess.fen()
	var fenarr = fenstr.split(" ");
	var value = 0;
	if(chess.baseTurn == 'w'){
		for(var i = 0; i < fenarr[0].length; i++){
			switch(fenarr[0][i]){
				case "Q":
				value += 9;
				break;
				case "B":
				value += 3;
				break;
				case "N":
				value += 3;
				break;
				case "R":
				value += 5;
				break;
				case "P":
				value += 1;
				break;
				case "q":
				value -= 9;
				break;
				case "b":
				value -= 3;
				break;
				case "n":
				value -= 3;
				break;
				case "r":
				value -= 5;
				break;
				case "p":
				value -= 1;
				break;
			}
		}
	} else {
		for(var i = 0; i < fenarr[0].length; i++){
			switch(fenarr[0][i]){
				case "Q":
				value -= 9;
				break;
				case "B":
				value -= 3;
				break;
				case "N":
				value -= 3;
				break;
				case "R":
				value -= 5;
				break;
				case "P":
				value -= 1;
				break;
				case "q":
				value += 9;
				break;
				case "b":
				value += 3;
				break;
				case "n":
				value += 3;
				break;
				case "r":
				value += 5;
				break;
				case "p":
				value += 1;
				break;
			}
		}
	}
	return value;
};

function Game () {
	this.chess = new Chess();
};

Game.prototype.functions = {
	getChildren: getChildren,
	terminal: terminal,
	utility: utility
};

Game.prototype.fen = function () {
	return this.chess.fen();
}

Game.prototype.moves = function () {
	return this.chess.moves();
}

Game.prototype.move = function (move) {
	return this.chess.move(move);
}

Game.prototype.game_over = function () {
	return this.chess.game_over();
}

Game.prototype.turn = function () {
	return this.chess.turn();
}

Game.prototype.history = function () {
	return this.chess.history();
}

Game.prototype.pgn = function () {
	return this.chess.pgn();
}

Game.prototype.in_draw = function () {
	return this.chess.in_draw();
}

Game.prototype.ascii = function () {
	return this.chess.ascii();
}

module.exports = Game;