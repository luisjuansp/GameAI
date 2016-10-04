# GameAI
Playground for AI algorithms in diferent games. These algorithms are implemented in javascript in the Node.js enviroment. Each module has a more in-depth documentation in its folder. Separate files include:
- Chess game test in [chess]
- Node server for graphical chess testing in [main]
- TicTacToe game test in [tictactoe]

## Algorithms(AI):
### Alpha Beta Pruning: 
Basic MinMax algorithm with Alpha Beta optimization in [alphabeta.js].

### Reinforcement Learning: 
### Chess Defensive Offensive
Custom reinforcement for Chess, taking in consideration deffensive and offensive values.
- Decision making in [playDefOff.js].
- Data feeding in [reinforceDefOff.js].

## Games:
### Chess
Chess implementation in [games/Chess.js], makes usage of [chess.js] for the chess logic.

### TicTacToe
TicTacToe implementation in [tictactoe.js]. Makes usage of [TicTacToeJS], modified in [games/TicTacToe.js].

## Database(db):
### mysql.js
Interface for [mysql] Javascript package in [mysql.js]

## Util:
### Merge sort
Merge sort implementation in [mergesort.js]

## Todos

- More AI Algorithms
- More Games

## License
MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [express]: <http://expressjs.com>
   [alphabeta.js]: <https://github.com/luisjuansp/GameAI/blob/master/AI/alphabeta.js>
   [reinforceDefOff.js]: <https://github.com/luisjuansp/GameAI/blob/master/AI/reinforceDefOff.js>
   [playDefOff.js]: <https://github.com/luisjuansp/GameAI/blob/master/AI/playDefOff.js>
   [mysql.js]: <https://github.com/luisjuansp/GameAI/blob/master/db/mysql.js>
   [mergesort.js]: <https://github.com/luisjuansp/GameAI/blob/master/util/mergesort.js>
   [main]: <https://github.com/luisjuansp/GameAI/blob/master/main.js>
   [chess]: <https://github.com/luisjuansp/GameAI/blob/master/chess.js>
   [tictactoe]: <https://github.com/luisjuansp/GameAI/blob/master/tictactoe.js>
   [chess.js]: <https://github.com/jhlywa/chess.js>
   [chessboardjs]: <https://github.com/oakmac/chessboardjs/>
   [tictactoe.js]: <https://github.com/luisjuansp/GameAI/blob/master/tictactoe.js>
   [TicTacToeJS]: <https://github.com/ryanhs/TicTacToeJS>
   [games/TicTacToe.js]: <https://github.com/luisjuansp/GameAI/blob/master/games/TicTacToe.js>
   [games/Chess.js]: <https://github.com/luisjuansp/GameAI/blob/master/games/Chess.js>
   [mysql]: <https://github.com/mysqljs/mysql>
