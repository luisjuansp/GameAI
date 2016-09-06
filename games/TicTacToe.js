/*
 * @license
 * Copyright (c) 2016 ryan hs <mr.ryansilalahi@gmail.com>
 * MIT License
 * https://github.com/ryanhs/TicTacToeJS.git
 */

 /*
  * Code modified to fit by Luis Juan Sanchez
  * Changes: 
  * 	move global variables to the game object,
  * 	added deepCopy and clone
  * Date: 04/09/2016
  */

  (function(){
	// 'use strict';

	var TicTacToe = function(requestSize){
		var game = {
			size : 3,
			board : [],
			moveCount : 1,
			history : [],
			statusCache : [this.moveCount, 'in progress'],
			legalMovesCache : [0, []]
		};

		game.reset = function(requestSize){
			if(parseInt(requestSize) >= 3) size = requestSize;

			var tmp = [],
			i, j;

			game.board = [];
			for(i = 0; i < game.size; i++){
				tmp = [];
				for(j = 0; j < game.size; j++) tmp.push(null);
					game.board.push(tmp);
			}

			game.moveCount = 1;
			game.history = [];
		}

		game.getSize = function(){ return game.size; }

		game.turn = function(){ return game.moveCount % 2 == 0 ? 'O' : 'X'; }

		game.ascii = function(){
			var o = '',
			i, j;
			for(i = 0; i < game.size; i++){
				for(j = 0; j < game.size; j++){
					if(j == 0) o += ' ';
					o += game.board[i][j] == null ? ' ' : game.board[i][j];
					if(j < game.size - 1) o += ' | ';
				}
				if(i < game.size - 1) o += "\r\n" + '-'.repeat(game.size * 4 - 1) + "\r\n";
			}
			return o;
		}

		game.ascii2 = function(){
			var o = '',
			i, j;
			for(i = 0; i < game.size; i++){
				for(j = 0; j < game.size; j++){
					if(j == 0) o += (game.size - i) + ' ';
					o += ' ';
					o += game.board[i][j] == null ? '.' : game.board[i][j];
					o += ' ';
				}
				o += "\r\n";
			}

			o += "   ";
			for(j = 0; j < game.size; j++) o += (j + 1) + '  ';
				return o;
		}

		/*
		 * default move
		 * move with Cartesian coordinate system, but array still in normal style :-)
		 * 
		 * usually board game like chess using cartesian coordinate, but x in alphabet
		 * since tic tac toe have no formal notation, lets use this
		 * 
		 * 1,3 | 2,3 | 3,3
		 * ---------------
		 * 1,2 | 2,2 | 3,2
		 * ---------------
		 * 1,1 | 2,1 | 3,1
		 * */

		 game.move = function(x, y){
		 	x--;
		 	y = Math.abs(y - game.size);

		 	if(y < 0 || y >= game.size || x < 0 || x >= game.size) return false;
		 	if(game.board[y][x] != null) return false;

		 	game.board[y][x] = game.turn();
		 	game.moveCount++;
		 	return true;
		 }

		/*
		 * exists x, y
		 */
		 game.exists = function(x, y){
		 	x--;
		 	y = Math.abs(y - game.size);

		 	if(y < 0 || y >= game.size || x < 0 || x >= game.size) return false;
		 	return game.board[y][x] != null;
		 }

		/*
		 * move with Array style
		 * 0,0 | 0,1 | 0,2
		 * ---------------
		 * 1,0 | 1,1 | 1,2
		 * ---------------
		 * 2,0 | 2,1 | 2,2
		 * */
		 game.moveArray = function(row, col){
		 	if(row < 0 || row >= size || col < 0 || col >= game.size) return false;
		 	if(game.board[row][col] != null) return false;

		 	game.board[row][col] = game.turn();
		 	game.moveCount++;
		 	return true;
		 }

		/*
		 * return "X" or "O" or "draw" or "in progress"
		 * */
		 function status(){
		 	var i, j,
			Xh, Oh, // X O horizontal
			Xv, Ov, // X O vertical
			Xd1, Od1, // diagonal \ 
			Xd2, Od2, // diagonal / 
			draw = true;
			Xh = Oh = Xv = Ov = Xd1 = Od1 = Xd2 = Od2 = 0;

			for(i = 0; i < game.size; i++){
			// horizontal&vertical reset
			Xh = Oh = Xv = Ov = 0;

			for(j = 0; j < game.size; j++){
					// draw checker
					if(game.board[i][j] == null) draw = false;
					
					// horizontal check
					if(game.board[i][j] == 'X') Xh++;
					if(game.board[i][j] == 'O') Oh++;
					
					// vertical check
					if(game.board[j][i] == 'X') Xv++;
					if(game.board[j][i] == 'O') Ov++;
				}

				// horizontal&vertical breaker
				if(Xh == game.size || Xv == game.size) return 'X';
				if(Oh == game.size || Ov == game.size) return 'O';

				// diagonal \  checker
				if(game.board[i][i] == 'X') Xd1++;
				if(game.board[i][i] == 'O') Od1++;
				
				// diagonal /  checker
				if(game.board[i][game.size - i - 1] == 'X') Xd2++;
				if(game.board[i][game.size - i - 1] == 'O') Od2++;
			}
			
			// diagonal breaker
			if(Xd1 == game.size || Xd2 == game.size) return 'X';
			if(Od1 == game.size || Od2 == game.size) return 'O';
			
			return draw ? 'draw' : 'in progress';
		}

		game.status = function(){
			if(game.statusCache[0] == game.moveCount) return game.statusCache[1];

			game.statusCache[0] = game.moveCount;
			game.statusCache[1] = status();
			return game.status(); // hmm
		}

		game.gameOver = function(){
			return game.status() != 'in progress';
		}

		game.isDraw = function(){
			return game.status() == 'draw';
		}


		/*
		 * some functions here is usefull for something like AI
		 * */
		 
		/*
		 * legal moves Cartesian Style
		 * */
		 game.legalMoves = function(){
		 	if(game.legalMovesCache[0] == game.moveCount) return game.legalMovesCache[1];

		 	var x, y,
		 	moves = [];
		 	for(y = 0; y < game.size; y++){
		 		for(x = 0; x < game.size; x++){						
						//~ x--;
						//~ y = Math.abs(y - size);
						if(game.board[y][x] == null) moves.push({'x': x + 1, 'y': game.size - y});
					}
				}
				
				game.legalMovesCache[0] = game.moveCount;
				game.legalMovesCache[1] = moves;
				return game.legalMoves(); // hmm
			}
			
		/*
		 * AI moves, just random :-p
		 * */
		 game.randomMove = function(){
		 	var move = game.legalMoves()[Math.floor(Math.random() * game.legalMoves().length)]
		 	game.move(move.x, move.y);
		 	return move;
		 }

		//Makes a deep copy of an object by recursive strategy
		 function deepCopy(obj) {
		 	if (Object.prototype.toString.call(obj) === '[object Array]') {
		 		var out = [], i = 0, len = obj.length;
		 		for ( ; i < len; i++ ) {
		 			out[i] = arguments.callee(obj[i]);
		 		}
		 		return out;
		 	}
		    // if (typeof obj === 'object') {
		    //     var out = {}, i;
		    //     for ( i in obj ) {
		    //         out[i] = arguments.callee(obj[i]);
		    //     }
		    //     return out;
		    // }
		    return obj;
		}

		//clones the atributes of the object deeply
		game.clone = function(other) {
			game.size = other.size;
			game.board = deepCopy(other.board);
			game.moveCount = other.moveCount;
			game.history = other.history.slice();
			game.statusCache = other.statusCache.slice();
			game.legalMovesCache = game.legalMovesCache.slice();
			game.baseTurn = other.baseTurn;
		}


		game.reset(requestSize);
		return game;
	}

	if(typeof exports !== 'undefined') exports.TicTacToe = TicTacToe;
	if(typeof window !== 'undefined') window.TicTacToe = TicTacToe;
})()
