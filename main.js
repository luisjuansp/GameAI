/*
 * Chess game run aided by the AlphaBeta implemetation
 *
 * Shows a game in the port outputed by the process (5000 by default)
 *
 * Created by: Luis Juan Sanchez, 04/09/2016
 */

var express = require('express');
var Chess = require('./games/Chess.js');
var alphabeta = require('./AI/alphabeta.js');

var app = express();
app.use("/js", express.static(__dirname + '/front-end/js'));
app.use("/img", express.static(__dirname + '/front-end/img'));
app.use("/css", express.static(__dirname + '/front-end/css'));

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
  		var move = alphabeta(chess, 2, chess.functions).last;
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