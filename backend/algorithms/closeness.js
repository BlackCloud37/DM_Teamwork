let Graph = require('../prototypes/graph');
let Dijkstra = require('./shortest_road');
let INF = 32767;
let MAXSIZE = 610;

let twoDArray = [
    [ 0, 5,18, 6, 9,10, 8,12,15,14],
        [ 5, 0, 3, 8,13,12, 3,16,19,18],
        [18, 3, 0,15,14, 7,16,19, 2,15],
        [ 6, 8,15, 0, 2, 0,16,14,18, 9],
        [ 9,13,14, 2, 0,17, 2,11,13, 1],
        [10,12, 7, 0,17, 0, 1, 7, 1,15],
        [ 8, 3,16,16, 2, 1, 0,19,10,17],
        [12,16,19,14,11, 7,19, 0, 5, 2],
        [15,19, 2,18,13, 1,10, 5, 0,14],
        [14,18,15, 9, 1,15,17, 2,14, 0]
];let graph = new Graph(twoDArray);

function closeness(graph, nodeId) {
    let totalDistance = 0;
    for (let i = 1; i<= graph.VetN; i++){
        if (i === nodeId) continue;
        totalDistance += Dijkstra(graph,nodeId,i)[1];
    }
    return (graph.VetN-1)/totalDistance;
}

console.log(closeness(graph,));