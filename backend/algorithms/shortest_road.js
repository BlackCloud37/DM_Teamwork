let Graph = require('../prototypes/graph');
let PriorityQueue = require('../prototypes/queue')

let INF = 32767;
let MAXSIZE = 610;
let shtDis = new Array(MAXSIZE);
let twoDArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 3, 0, 0, 0],
    [0, 0, 0, 2, 5, 0, 0],
    [0, 0, 0, 0, 3, 4, 0],
    [0, 0, 0, 0, 0, 2, 3],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 5, 0]
];let graph = new Graph(twoDArray);


function initArray(arr, size, value) {for (let i = 0; i <= size; i++) arr[i] = value;}
function QueueElement(element, priority) {this.element = element;this.priority = element;}
let cmp = function (a,b) {return shtDis[a] <= shtDis[b];}


//shortestRoad
function shortestRoad(graph, fromId, toId) {

    let road = new Array(MAXSIZE);
    initArray(shtDis, MAXSIZE, INF);
    initArray(road, MAXSIZE, -1);
    let totNode = graph.VetN;

    shtDis[fromId] = 0;
    let ansStack = new Array();
    let priorityQueue = new PriorityQueue(QueueElement, cmp);
    priorityQueue.push(fromId);

    while (priorityQueue.length() > 0){
        let tmpId = priorityQueue.pop().element;
        let weight = graph.matrix.data[tmpId];
        for (let nextId = 1; nextId <= totNode; nextId++){
            if (weight[nextId] != 0){
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
    while (back != -1){
        ansStack.push(back);
        back = road[back];
    }

    if (shtDis[toId] === INF)
        return false;
    else
        return [ansStack, shtDis[toId]];
}

let ret = shortestRoad(graph, 1,6);
console.log(ret);
