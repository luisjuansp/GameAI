# Database Interaction

## MySQL
>Module [mysql.js] is an interface to [mysql], which generates and interacts with a conection to a MySQL database. It removes the need of writing the formal queries, and facilitates the information translation. The database enviroment has to be setup previously. 

On functions like `insert` and `transactionInsertUpdate`, in which and object is to be inserted, the keys of the object are used as the columns for the query, so the javascript object's keys need to be named the same as the table columns in the database.

Usage example:

```javascript
var mysql = require('../db/mysql.js');
mysql.createCon('localhost', 'root', '', 'ChessDefOff');
mysql.selectAll('Moves', 'board = \''  + fen.substr(0, l) + '\'' , function (rows){
    console.log("rows");
    mysql.end(); 
    // Important to end the connection in the callback to assure that 
    //      the communication to the database does not break before the action
});
```

### Exported functions:
---
#### Create Connection
Creates a connection to the database with the given parameters.
```javascript
module.exports.createCon = function (host, user, password, database) {...}
```
##### Params:
**host**:  
Server to connect, can be localhost.  
**user**:  
User in the MySQL enviroment  
**password**:  
User's pasword  
**database**:  
Database ot connect  

##### Returns:
Nothing.  

---
#### Insert
Inserts an object to a table. The object's keys to insert have to be named as the respective table comlumns
```javascript
module.exports.insert = function (table_name, object) {...}
```
##### Params:
**table_name**:  
Name of the table as in the batabase  
**object**:  
Javascript object to insert  

##### Returns:
Nothing.

---
#### Select
Selects columns from a table
```javascript
module.exports.select = function (table_name, columns, where, callback) {...}
```
##### Params:
**table_name**:  
Name of the table as in the batabase  
**columns**:  
Columns to select, as a string  
**where**:  
Where condition, as a string  
**callback**:  
Object with:  
-fun: function to call with the result, must recieve (rows, param)  
-param: additional optional parameters for the function  

##### Returns:
Nothing.

---
#### Select All
Selects all columns from a table
```javascript
module.exports.selectAll = function (table_name, where, callback) {...}
```
##### Params:
**table_name**:  
Name of the table as in the batabase  
**where**:  
Where condition, as a string  
**callback**:  
Object with:  
-fun: function to call with the result, must recieve (rows, param)  
-param: additional optional parameters for the function  

##### Returns:
Nothing.

---
#### Transaction Insert/Update
Updates the table if the where condition returns rows, if not, it inserts the object.
```javascript
module.exports.transactionInsertUpdate = function (table_name, object, where, prepUpdate, callback) {...}
```
##### Params:
**table_name**:  
Name of the table as in the batabase  
**object**:  
Object to be inserted  
**where**:  
Where condition, as a string  
**prepUpdate**:  
Object with:  
-fun: function to build the update action, must recieve (rows, param) as parameters and return a string with the update action  
-param: additional optional parameters for the function  
**callback**:  
Object with:  
-fun: function to call when the transaction is done, must recieve (param)  
-param: additional optional parameters for the function  

##### Returns:
Nothing.

---
#### End Connection
Ends the conection to the database. Actions after calling this function would fail
```javascript
module.exports.end = function () {...}
```
##### Params:
none

##### Returns:
Nothing.


**Free Software, Hell Yeah!**

[mysql.js]: <https://github.com/luisjuansp/GameAI/blob/master/db/mysql.js>
[mysql]: <https://github.com/mysqljs/mysql>
