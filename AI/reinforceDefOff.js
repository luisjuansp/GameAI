/*
 * Created by: Luis Juan Sanchez, 20/09/2016
 *
 * Reinforces the Moves table in the ChessDefOff database with a given game
 *
 * Exported function: returns nothing
 *      chess - completed chess game
 *      fun - function to call when the reinforcement is done
 */

//Imports, parameters and global variables
var Chess = require('../games/Chess.js');
var mysql = require('../db/mysql.js');

var history = [];
var callback; //function to callback when reinforcement is done
var lookAhead = 10; //moves ahead to evaluate the current move

//Object that is sent as the prepUpdate parameter in the transactionInsertUpdate function of the mysql object
var prepUpdate = {}
//Function to return what columns to update and with what values
prepUpdate.fun = function (rows, state) {
	var counter = 1 + parseInt(rows[0].counter);
	var offensive = (parseInt(rows[0].offensive) * parseInt(rows[0].counter) + state.offensive) / counter;
	var defensive = (parseInt(rows[0].defensive) * parseInt(rows[0].counter) + state.defensive) / counter;
	return 'offensive=' + offensive + ', defensive=' + defensive + ', counter=' + counter;
}

//Object that is sent as the callback parameter in the callback function of the mysql object
var reinforce = {};
//Callback function to be called by transactionInstertUpdate to continue the game reinforcement
reinforce.fun = function (index) {
	if(index < history.length){
		var state = history[index];

		//Add parameters for the respective callbacks to the functions
		prepUpdate.param = state;
		reinforce.param = index + 1;

		mysql.transactionInsertUpdate('Moves', state,
			'board = \''  + state.board + '\' && move =\'' + state.move +'\'' , prepUpdate, reinforce);
	} else {
		//Reinforcement is done
		mysql.end();
		callback();
	}
}

//Evaluates own pieces to calculate Defensive values
var getOwnPieces = function (fenstr, side) {
	var fenarr = fenstr.split(" ");
	var value = 0;
	if(side == 'w'){
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
			}
		}
	} else {
		for(var i = 0; i < fenarr[0].length; i++){
			switch(fenarr[0][i]){
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
	return value - 39;
};

//Evaluates enemy pieces to calculate Offensive values
var getEnemyPieces = function (fenstr, side) {
	var fenarr = fenstr.split(" ");
	var value = 0;
	if(side == 'w'){
		for(var i = 0; i < fenarr[0].length; i++){
			switch(fenarr[0][i]){
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
			}
		}
	}
	return value + 39;
};

module.exports = (chess, fun)=> {
	callback = fun;

	//Recreate game history
	var data = new Chess();
	var moves = chess.history();
	history = [];
	for(var move in moves){
		var fen = "" + data.fen();
		var l = fen.lastIndexOf(" ", fen.lastIndexOf(" ") - 1);
		var state = {board: fen.substr(0, l), move: moves[move]};
		history.push(state);
		data.move(moves[move]);
	}

	//Check for draw for final evaluations
	if(!data.in_draw()){
		var loser = data.turn();
		for(var state in history){
			var turn = history[state].board.charAt(history[state].board.indexOf(" ") + 1);
			var impact = parseInt(state) + lookAhead;
			if(state >= history.length - 2){
				//Last two moves
				if(turn == loser){
					history[state].defensive = -1000;
					history[state].offensive = -1000;
				} else {
					history[state].defensive = 1000;
					history[state].offensive = 1000;
				}
			} else if(impact >= history.length){
				//Last 'lookAhead' moves
				if(turn == loser){
					history[state].defensive = -1000;
					history[state].offensive = getEnemyPieces(history[history.length - 1].board, turn);
				} else {
					history[state].defensive = getOwnPieces(history[history.length - 1].board, turn);
					history[state].offensive = 1000;
				}
			} else {
				history[state].offensive = getEnemyPieces(history[impact].board, turn);
				history[state].defensive = getOwnPieces(history[impact].board, turn);
			}
		}
	} else {
		for(var state in history){
			var impact = parseInt(state) + lookAhead;
			if(state >= history.length - 2){
				//Last two moves
				history[state].defensive = 0;
				history[state].offensive = 0;
			} else if(impact >= history.length){
				//Last 'lookAhead' moves
				history[state].defensive = getOwnPieces(history[history.length - 1].board, turn);
				history[state].offensive = getEnemyPieces(history[history.length - 1].board, turn);
			} else {
				history[state].offensive = getEnemyPieces(history[impact].board, turn);
				history[state].defensive = getOwnPieces(history[impact].board, turn);
			}
		}
	}

	mysql.createCon('localhost', 'root', '', 'ChessDefOff');

	//Comence reinforcement cycle
	reinforce.fun(0);
}