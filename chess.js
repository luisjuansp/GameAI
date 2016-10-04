/*
 * Created by: Luis Juan Sanchez, 04/09/2016
 *
 * Chess game test
 */

//Imports, parameters and global variables
var Chess = require('./games/Chess.js');
var alphabeta = require('./AI/alphabeta.js');
var reinforceDefOff = require('./AI/reinforceDefOff.js');
var playDefOff = require('./AI/playDefOff.js');

var chess = new Chess();

var playSmart = function () {
	
	if(!chess.game_over()){
		playDefOff(chess, function (move) {
			chess.move(move);
			playSmart();
		});
	} else {
		if (chess.in_draw()) {
			console.log(chess.history().length + " DRAW")
		} else {
			console.log(chess.history().length + " Loser: " + chess.turn());
		}
		console.log(JSON.stringify(chess.history()));
		console.log(chess.ascii());
	}
} 
playSmart();

var feedEndlessly = function () {
	chess = new Chess();
	var i = 0;
	while(!chess.game_over()){
		var move = alphabeta(chess, 1, chess.functions).last;
		if(i++%5==0)console.log(i);
		chess.move(move);
	}
	if (chess.in_draw()) {
		console.log(chess.history().length + " DRAW")
	} else {
		console.log(chess.history().length + " Loser: " + chess.turn());
	}
	reinforceDefOff(chess, playSmart);
	// reinforceDefOff(chess, feedEndlessly);
} 
// feedEndlessly();

// while(!chess.game_over()){

// }