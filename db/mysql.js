/*
 * Created by: Luis Juan Sanchez, 20/09/2016
 *
 * Extends the mysql module to ease its use 
 *
 * Exported functions
 *	createCon: creates a connection to a database and returns the connetion
 *		host - location of the database
 *     	user - user for login
 *      password - password for user
 *      database - database name 
 *	insert: inserts data to the table
 *		table_name - name of the table
 *     	object - object to be inserted
 *	select: selects data from a table and makes a callback with the rows recieved
 *		table_name - name of the table
 *     	columns - columns to select
 *      where - where condition of the select
 *      callback - object with fun(callback function) and param(callback parameter)
 *	selectAll: selects data from a table and makes a callback with the rows recieved
 *		table_name - name of the table
 *      where - where condition of the select
 *      callback - object with fun(callback function) and param(callback parameter)
 *	transactionInsertUpdate: creates a connection to a database and returns the connetion
 *		table_name - name of the table
 *     	object - object to be inserted
 *		where - where condition of the select
 *		prepUpdate - object with fun(prepare update function) and param(prepare update parameter)
 *      callback - object with fun(callback function) and param(callback parameter)
 */

//Imports, parameters and global variables
var mysql = require('mysql');

var connection;

module.exports.createCon = function (host, user, password, database) {
	connection = mysql.createConnection({
		host     : host,
		user     : user,
		password : password,
		database : database
	});
	connection.connect();
}

function getColumnsAndValues (object) {
	var keys = Object.keys(object);
	var values = '';
	for(var k in keys){
		values += '\'' + object[keys[k]] + '\',';
	}
	values = values.substr(0, values.length - 1);
	return {keys: keys.join(), values: values};
}

module.exports.insert = function (table_name, object) {
	var obj = getColumnsAndValues(object);
	var columns = obj.keys;
	var values = obj.values;

	connection.query('INSERT INTO '+ table_name + ' (' + columns + ')' + 'VALUES (' + values + ');', function(err, rows, fields) {
		if (err) throw err;
	});
}

module.exports.select = function (table_name, columns, where, callback) {
	connection.query('SELECT '+ columns + ' FROM ' + table_name + ' WHERE ' + where + ';', function(err, rows, fields) {
		if (err) throw err;
		callback.fun(rows, callback.param);
	});
}

module.exports.selectAll = function (table_name, where, callback) {
	connection.query('SELECT * FROM ' + table_name + ' WHERE ' + where + ';', function(err, rows, fields) {
		if (err) throw err;
		callback.fun(rows, callback.param);
	});
}

//Updates rows if the where condition returns any, if not, it inserts a new row with the recieved values
module.exports.transactionInsertUpdate = function (table_name, object, where, prepUpdate, callback) {
	var obj = getColumnsAndValues(object);
	var columns = obj.keys;
	var values = obj.values;

	connection.beginTransaction(function(err) {
		if (err) throw err;

		//SELECT statement to check if rows already exists
		connection.query('SELECT '+ columns + ', counter FROM ' + table_name + ' WHERE ' + where + ';', function(err, rows, fields) {
			if (err) return connection.rollback(function() { throw err; });

			//INSERT if no rows were found
			if(rows.length == 0){	
				connection.query('INSERT INTO '+ table_name + ' (' + columns + ')' + 'VALUES (' + values + ');', function(err, rows, fields) {
					if (err) return connection.rollback(function() { throw err;	}); 

					connection.commit(function(err) {
						if (err) return connection.rollback(function() { throw err; });

						callback.fun(callback.param);
					});
				});
			} else {
				//UPDATE the values

				//Prepare the 'set' part of the UPDATE statement with the function recieved
				var set = prepUpdate.fun(rows, prepUpdate.param);

				connection.query('UPDATE '+ table_name + ' SET ' + set + ' WHERE ' + where + ';', function(err, rows, fields) {
					if (err) return connection.rollback(function() { throw err; }); 

					connection.commit(function(err) {
						if (err) return connection.rollback(function() { throw err; });

						callback.fun(callback.param);
					});
				});
			}
		});
});
}

module.exports.end = function () {	
	connection.end();
}