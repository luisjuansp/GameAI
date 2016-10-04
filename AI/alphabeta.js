/*
 * Created by: Luis Juan Sanchez, 04/09/2016
 *
 * Simple MinMax algorithm with AlphaBeta Pruning
 *
 * Exported function: returns the node with the best move available
 *      node - initial node to expand
 *      depth - number of levels to expand, <=0 means infinite
 *      functions - object with the required functions:
 *          getChildren(node): returns the children nodes from a node
 *          terminal(node): returns true if the node is terminal
 *          utility(node): return the heuristic utility of the node in its current state
 */

// Debug variable to know the number of leafs visited
var visitCount = 0;

function maxValue (node, depth, alpha, beta, functions){
    if (depth == 0 || functions.terminal(node)) {
        visitCount++;
        return functions.utility(node);
    }
    var v = -Infinity;
    var nodes = functions.getChildren(node);
    for (var i = 0; i < nodes.length; i++) {
        v = Math.max(v , minValue(nodes[i], depth - 1, alpha, beta, functions));
        if (v >= beta) return v; //Prune
        alpha = Math.max(alpha, v);
    }
    return v;
}

function minValue(node, depth, alpha, beta, functions){
    if (depth == 0 || functions.terminal(node)) {
        visitCount++;
        return functions.utility(node);
    }
    var v = +Infinity;
    var nodes = functions.getChildren(node);
    for (var i = 0; i < nodes.length; i++) {
        v = Math.min(v , maxValue(nodes[i], depth - 1, alpha, beta, functions));
        if (v <= alpha) return v; //Prune
        beta = Math.min(beta, v);
    }
    return v;
}


module.exports = function (node, depth, functions){
    visitCount = 0;
    node.baseTurn = node.turn();
    var max = -Infinity;
    var bests = [];

    var nodes = functions.getChildren(node);
    for (var i = 0; i < nodes.length; i++) {
        var eval = minValue(nodes[i], depth - 1, -Infinity, Infinity, functions); 
        // console.log(JSON.stringify(nodes[i].last) + " " + eval);
        if(eval == max){
            bests.push(nodes[i]);
        } else if(eval > max){
            max = eval;
            bests = [];
            bests.push(nodes[i]);
        }
    } 
    // console.log(visitCount);
    return bests[Math.floor(Math.random() * bests.length)];
};
