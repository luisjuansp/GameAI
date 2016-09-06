/*
 * TicTacToe game run aided by the AlphaBeta implemetation
 *
 * Created by: Luis Juan Sanchez, 04/09/2016
 */

 var Game = require('./games/TicTacToe.js').TicTacToe;
 var alphabeta = require('./AI/alphabeta.js');

 var getChildren = function (tictac) {
 	var moves = [];
 	var legals = tictac.legalMoves();

 	for (var i = 0; i < legals.length; i++) {
		//get the Game functions
		var temp = new Game();

		//get the tictac object attributes
		temp.clone(tictac);

		//save the last move to get it later
		temp.last = legals[i];

		temp.move(legals[i].x, legals[i].y);
		moves.push(temp);
	};
	return moves;
};

var terminal = function (tictac) {
	return tictac.gameOver();
};

var utility = function (tictac) {
	if(tictac.isDraw()) return 0;
	if(tictac.status() == tictac.baseTurn) return 10;
	return -10;
};

var functions = {
	getChildren: getChildren,
	terminal: terminal,
	utility: utility
};

//Create a new game
var game = new Game();

// game.move(move.x, move.y);
// game.move(move.x, move.y);
// game.move(move.x, move.y);


//play a whole game
while(!game.gameOver()){

	game.baseTurn = game.turn();
	//access the last move saves in getChildren
	var move = alphabeta.chooseBest(game, -1, functions).last;

	console.log(move);

	game.move(move.x, move.y);
	console.log(game.ascii());
}