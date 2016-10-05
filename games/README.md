# Games:
## Chess
Extends [chess.js] by [jhlywa] for the chess logic. Adds a parameter called functions, which includes:

```javascript
Game.prototype.functions = {
  getChildren: getChildren,
  terminal: terminal,
  utility: utility
};
```

#### Get Children
Searchs for the posible moves.
```javascript
var getChildren = function (chess) {...}
```
##### Params:
**chess**:  
Current chess object.  

##### Returns:
An array of game states.  

---
#### Terminal
Checks to see if the game has ended.
```javascript
var terminal = function (chess) {...}
```
##### Params:
**chess**:  
Current chess object. 

##### Returns:
Boolean representing if the game is over.  

---
#### Create Connection
Creates a connection to the database with the given parameters.
```javascript
var utility = function (chess) {...}
```
##### Params:
**chess**:  
Current chess object. 

##### Returns:
Evaluation of the current state.  

## TicTacToe
Modifies to [TicTacToeJS] by [ryanhs], adds a clone function to make a deep copy of the game.

---
#### Clone
Modifies the current object by deeply copying the object in the parameters.
```javascript
game.clone = function(other) {...}
```
##### Params:
**other**:  
Object to clone from.  

##### Returns:
Nothing.  

---
#### Deep Copy
Creates a deep copy of an object.
```javascript
function deepCopy(obj) {...}
```
##### Params:
**obj**:  
Object to copy.  

##### Returns:
Copy of the object.  


   [chess.js]: <https://github.com/jhlywa/chess.js>
   [jhlywa]: <https://github.com/jhlywa>
   [TicTacToeJS]: <https://github.com/ryanhs/TicTacToeJS>
   [ryanhs]: <https://github.com/ryanhs/>
