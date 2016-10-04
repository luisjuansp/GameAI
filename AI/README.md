# Artificial Intelligence Algorithms
---
### Alpha Beta Pruning:
>This algoritm consists in looking for the maximum gain of the possible moves, while taking in consideration the damage done by the enemy's moves. This is done by creating a decision tree in which every node is a state of the board, and every edge is the move that takes one state to the other, and evaluating it Depth first. The starting state is the current board position. To make for the game turns, each level alternates between looking for the best value and looking for worst. This simulates the players best choices by maximazing the gain, and the enemy's choices by minimazing the player's gain. The evaluation must reach the furthest children from the root as posible, or -leaf nodes- , being limited by a set depth or by the ending of the game. Then, by generatin the heuristic value of al the leaf nodes of one parent node, a value can be assigned to that parent node by getting the minimum value or maximun value, depending on the level of the parent node. With the AlphaBeta Pruning optimization, when we are evaluating nodes from a same parent, we save an alpha and a beta, alpha being the maximum value from the parent's siblings and beta the minimun. When the algorith is looking for the minimun value, if a minimun is found and is less than the alpha (maximun value found of the parent's siblings), then the search through that node is cut off, because no greater value will be found. The same happens when looking for the maximum, and this maximum is greater that the beta.

The `function MinValue` chooses the minimun value for the player, as an enemy would, while `function MaxValue` takes the maximun value for the player, as a player would. Each function calls the other with the child nodes, meaning that they make a move so it would be the opponent's turn. Each function checks if the limit has been reached, or is the game has ended, meaning that the state would be terminal and that the node mustn't be expanded. The heuristical utility is called with this node to return a value to the parent. 

#### Exported function:
```javascript
module.exports = function (node, depth, functions){...}
```
##### Params:
**node**:  
Initial node to expand  
**depth**:  
Number of levels of depth to expand, <=0 means infinite  
**functions**:  
Object with the required functions:  
 -getChildren(node): returns the children nodes from a node  
 -terminal(node): returns true if the node is terminal  
 -utility(node): return the heuristic utility of the node in its current state  

##### Returns:
Best children of the node sent.

---
## Reinforcement Learning: 
---
### Chess Defensive Offensive
Custom reinforcement for Chess, taking in consideration deffensive and offensive values. This algorith uses the [mysql.js] module to acces a table called `Moves` in the database `ChessDefOff`. The table is built like this:

| board                                                    | move | defensive | offensive | counter |
| :------------------------------------------------------: | :--: | :-------: | :-------: | :-----: |
| rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -     | a3   |         0 |         0 |       2 |
| rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq -    | h5   |         0 |         0 |       1 |
| rnbqkbnr/ppppppp1/8/7p/8/P7/1PPPPPPP/RNBQKBNR w KQkq h6  | b4   |         0 |         1 |       1 |
| rnbqkbnr/ppppppp1/8/7p/1P6/P7/2PPPPPP/RNBQKBNR b KQkq b3 | a6   |        -3 |         1 |       1 |
| rnbqkbnr/1pppppp1/p7/7p/1P6/P7/2PPPPPP/RNBQKBNR w KQkq - | c4   |        -3 |         1 |       1 |

In this table, `board` is the state of the game, in which the first part represents the board, the second part the turn, the third part the posible castlings, and the forth part the en-passant. `move` is the move made. `defensive` is the defensive value, `offensive` is the offensive value. `counter` is the times this situation has happened.

#### Reinforcement (Data Feed)
>The reinforcement is done by analyzing an ended game, iterating throught each turn from the beginning and creating a new structure. For each turn of the game, an object like `{board,move,defensive,offensive}` is created, which is referred as `state`, and saved in an array. The `defensive` and `offensive` value are calculated by looking ahead a determined number of turns, and evaluating the state of the game in that future turn. The defensive value is calculated by adding the values of the player's pieces and substracting `39`, which is the starting sum of the pieces' values. The defensive value is calculated by substracting the values of the enemy's pieces and adding `39`. When the current turn starts to reach the last turn, meaning that the distance between the current turn and the last is less than `lookAhead`, the defensive and offensive values are calculated differentely. If the game didn't end in a draw, the winner gets an offensive value of `1000`, and the loser gets a defensive value of `-1000`. On each players' last move, the winner gets `1000` in both values, and the loser gets `-1000`. The counter column in the table helps to average the new data. When a row is updated, the new offensive and defensive values are multiplied by the counter, then the new values are added, and then the sum is divided by the counter plus one.  


The objects `prepUpdate` and `reinforce` are used for the callbacks to interact with [mysql.js]. `prepUpdate` contains the function to weight the values for the update statement, and as the `param`, a `state` is sent. `reinforce` contains the function that calls `transactionInsertUpdate` of [mysql.js], which receives the index of the array of states as parameter, and as `param`, index plus one is asigned. To get the defensive value and the offensive value, the functions `getEnemyPieces` and `getOwnPieces` are used.

#### Exported function:
```javascript
module.exports = (chess, fun)=> {...}
```
##### Params:
**chess**:  
Completed chess game  
**fun**:  
Function to call when the reinforcement is done

##### Returns:
Nohting

#### Playing (Data Read)
> To select a move, the algorithm chooses a best move with the fitness proportion selection. This selection sums the value of each posible move to gain a total fitness (as in the image below). With this, a simple random number in between cero and these fitness should give us a good move most of the times, as the moves with more fitness have more probability of being chosen. This is done to make the algorithm not choose the best move each time, and to explore the already known moves from time to time.

![roulette selection](https://upload.wikimedia.org/wikipedia/commons/2/2a/Fitness_proportionate_selection_example.png)

To ease the fitness caluclation process, the data is normalized to make the minimun value equal to one and the maximum equal to the range of the data plus one. Then, to differentiate the values more, powers each evaluation to the power of two. Then, it sorts the moves by evaluation using [mergesort.js], and performs a fitness selection.

- TO DO - Exploration on unknown moves

#### Exported function:
```javascript
module.exports = function (chess, fun) {...}
```
##### Params:
**chess**:  
current state of the game  
**fun**:  
Function to call with the move as parameter

##### Returns:
Returns the next move

**Free Software, Hell Yeah!**

   [mysql.js]: <https://github.com/luisjuansp/GameAI/blob/master/db/mysql.js>
   [mergesort.js]: <https://github.com/luisjuansp/GameAI/blob/master/util/mergesort.js>
