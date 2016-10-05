/*
 * Created by: Luis Juan Sanchez, 20/09/2016
 *
 * Analizes the Moves table in the ChessDefOff database and chooses a move
 *
 * Exploits the best move available. Normalizes the data to make the minimun 1
 *		and the maximum 1 plus the range of the data, and the powers each evaluation
 *		to the power of two to set a bigger diference betwen the moves. Then, it 
 *		sorts the moves by evaluation, and performs a roulette selection of the moves.
 *
 * TO DO - Exploration
 *
 * Exported function: returns the node with the best move available
 *		chess - current state of the game
 *      fun - callback function to call with the move as parameter
 */

//Imports, parameters and global variables
var mergesort = require('../util/mergesort.js');
var mysql = require('../db/mysql.js');

var callback; //function to callback with the move as parameter

//Function to receive the rows and values and select a next move
var analyzeMoves = function (rows) {
	//End the conection after recieving the values
	mysql.end();

	var zeroFix = 1;

	if (rows.length > 0){
		for(var i in rows){
			rows[i].eval = (rows[i].defensive + rows[i].offensive);
		}

		rows = mergesort(rows, function (rowA, rowB) {
			return rowA.eval > rowB.eval;
		});

		var curve = zeroFix - rows[rows.length-1].eval;
		var sum = 0;

		for(var i in rows){
			rows[i].eval = rows[i].eval + curve;
			rows[i].eval *= rows[i].eval;
			sum += rows[i].eval;
		}

		var bar = Math.random() * sum;

		var index = 0;
		for(var i in rows){
			bar -= rows[i].eval;
			if(bar < 0){
				index = i;
				break;
			}
		}

		callback(rows[i].move);
	} 

	//TO DO: add forced exploration
	else {

		callback("");
	}
}

module.exports = function (chess, fun) {

	callback = fun;
	
	//Prepare values for SELECT
	var analyze = {};
	analyze.fun = analyzeMoves;
	analyze.param = "";
	var fen = "" + chess.fen();
	var l = fen.lastIndexOf(" ", fen.lastIndexOf(" ") - 1);

	mysql.createCon('localhost', 'root', '', 'ChessDefOff');
	mysql.selectAll('Moves', 'board = \''  + fen.substr(0, l) + '\'' , analyze);
}
