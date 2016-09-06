# GameAI
Playground for AI algorithms in diferent games. This algorithms are implemented in javascript in the Node.js enviroment.

## Algorithms:
### Alpha Beta Pruning: 
Basic MinMax algorithm with Alpha Beta optimization in [alphabeta.js].

#### Exports: 
```js
function chooseBest(node, depth, functions)
```
**++Returns++** the node with the best move available
- node: initial node to expand
- depth: number of levels to expand, <=0 means infinite
- functions: object with the required functions:
    - getChildren(node): returns the children nodes from a node
    - terminal(node): returns true if the node is terminal
    - utility(node): return the heuristic utility of the node in its current state

## Games:
### Chess
Chess implementation in [main.js], makes usage of [chess.js] by [jhlywa] for the chess logic, and [chessboardjs] by [oakmac] for the graphic representation of the game in the client side. Uses [express] in the server side.

### TicTacToe
TicTacToe implementation in [tictactoe.js]. Makes usage of [TicTacToeJS] by [ryanhs], modified in [games/TicTacToe.js].

## Todos

- More AI Algorithms
- More Games

## License
MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [express]: <http://expressjs.com>
   [alphabeta.js]: <https://github.com/luisjuansp/GameAI/blob/master/AI/alphabeta.js>
   [main.js]: <https://github.com/luisjuansp/GameAI/blob/master/main.js>
   [chess.js]: <https://github.com/jhlywa/chess.js>
   [jhlywa]: <https://github.com/jhlywa>
   [chessboardjs]: <https://github.com/oakmac/chessboardjs/>
   [oakmac]: <https://github.com/oakmac/>
   [tictactoe.js]: <https://github.com/luisjuansp/GameAI/blob/master/tictactoe.js>
   [TicTacToeJS]: <https://github.com/ryanhs/TicTacToeJS>
   [ryanhs]: <https://github.com/ryanhs/>
   [games/TicTacToe.js]: <https://github.com/luisjuansp/GameAI/blob/master/games/TicTacToe.js>
