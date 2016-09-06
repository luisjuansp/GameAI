/*
 * Chess game run aided by the AlphaBeta implemetation
 *
 * Shows a game in the port outputed by the process (5000 by default)
 *
 * Created by: Luis Juan Sanchez, 04/09/2016
 */

var express = require('express');
var Chess = require('chess.js').Chess;
var alphabeta = require('./AI/alphabeta.js');

var app = express();
app.use("/js", express.static(__dirname + '/front-end/js'));
app.use("/img", express.static(__dirname + '/front-end/img'));
app.use("/css", express.static(__dirname + '/front-end/css'));

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
		if (chess.turn() == chess.baseTurn) return -5000;
		else return 5000;
	}
	var fenstr = chess.fen()
	var fenarr = fenstr.split(" ");
	// console.log(fenarr[1]);
	var value = 0;
	if(chess.baseTurn == 'w'){
		for(var i = 0; i < fenarr[0].length; i++){
			switch(fenarr[0][i]){
				case "Q":
				value += 500;
				break;
				case "B":
				value += 250;
				break;
				case "N":
				value += 250;
				break;
				case "R":
				value += 250;
				break;
				case "P":
				value += 10;
				break;
				case "q":
				value -= 500;
				break;
				case "b":
				value -= 250;
				break;
				case "n":
				value -= 250;
				break;
				case "r":
				value -= 250;
				break;
				case "p":
				value -= 10;
				break;
			}
		}
	} else {
		for(var i = 0; i < fenarr[0].length; i++){
			switch(fenarr[0][i]){
				case "Q":
				value -= 500;
				break;
				case "B":
				value -= 250;
				break;
				case "N":
				value -= 250;
				break;
				case "R":
				value -= 250;
				break;
				case "P":
				value -= 10;
				break;
				case "q":
				value += 500;
				break;
				case "b":
				value += 250;
				break;
				case "n":
				value += 250;
				break;
				case "r":
				value += 250;
				break;
				case "p":
				value += 10;
				break;
			}
		}
	}
	return value;
};

var functions = {
	getChildren: getChildren,
	terminal: terminal,
	utility: utility
};

var chess = new Chess();

app.get('/', function(req, res) {
	res.sendFile("front-end/index.html", {root: __dirname});
});

app.get('/move', function(req, res){
	//var moves = chess.moves();
  	//var move = moves[Math.floor(Math.random() * moves.length)];
  	if(!chess.game_over()){
  		console.log(chess.turn());
  		chess.baseTurn = chess.turn();
  		var move = alphabeta.chooseBest(chess, 2, functions).last;
  		console.log(move);
  		chess.move(move);
  		var result = {move: chess.fen()};
  		if(chess.game_over()) {
  			console.log("Game Over")
  			result.gameOver = true;
  		}
  	}
  	// console.log("exit");
  	res.send(result);
  });

app.get('/reset', function(req, res){
	chess = new Chess();
	res.send({move: chess.fen()});
});


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});