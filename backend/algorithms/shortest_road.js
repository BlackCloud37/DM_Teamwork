let Graph = require('../prototypes/graph');
let PriorityQueue = require('../prototypes/queue')

let INF = 32767;
let MAXSIZE = 610;
let shtDis = new Array(MAXSIZE);
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


function initArray(arr, size, value) {for (let i = 0; i <= size; i++) arr[i] = value;}
function QueueElement(element, priority) {this.element = element;this.priority = element;}
let cmp = function (a,b) {return shtDis[a] <= shtDis[b];}


//shortestRoad Dijkstra
function shortestRoad(graph, fromId, toId) {

    let road = new Array(MAXSIZE);
    initArray(shtDis, MAXSIZE, INF);
    initArray(road, MAXSIZE, -1);
    let totNode = graph.VetN;

    shtDis[fromId] = 0;
    let ansStack = [];
    let priorityQueue = new PriorityQueue(QueueElement, cmp);
    priorityQueue.push(fromId);

    while (priorityQueue.length() > 0){
        let tmpId = priorityQueue.pop().element;
        let weight = graph.matrix.data[tmpId];
        for (let nextId = 1; nextId <= totNode; nextId++){
            if (weight[nextId] !== 0){
                if (shtDis[nextId] > shtDis[tmpId] + weight[nextId]){
                    shtDis[nextId] = shtDis[tmpId] + weight[nextId];
                    priorityQueue.push(nextId);
                    road[nextId] = tmpId;
                }
            }
        }
    }

    //output
    let back = toId;
    while (back !== -1){
        ansStack.push(back);
        back = road[back];
    }

    if (shtDis[toId] === INF)
        return false;
    else
        return [ansStack, shtDis[toId]];
}

let ret = shortestRoad(graph, 1,6);
//console.log(ret);

module.exports = shortestRoad;