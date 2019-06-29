let Graph = require('../prototypes/graph');
let PriorityQueue = require('../prototypes/queue');

let INF = 32767;
let MAXSIZE = 610;

let twoDArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 3, 0, 0, 0],
    [0, 6, 0, 2, 5, 0, 0],
    [0, 3, 2, 0, 3, 4, 0],
    [0, 0, 5, 3, 0, 2, 3],
    [0, 0, 0, 4, 2, 0, 5],
    [0, 0, 0, 0, 3, 5, 0]
];let graph = new Graph(twoDArray);

function Node(id, pre, dis){
    this.id = id;
    this.pre = pre;
    this.dis = dis;
}

function QueueElement(element, priority) {
    this.element = element;
    this.priority = element.dis;
}

function initArray(arr, size, value) {for (let i = 0; i <= size; i++) arr[i] = value;}
function cmp(a,b){return a<=b };

function minSpanTree(graph, firstPoint) {
    let VetN = graph.VetN;
    let weightSum = 0;
    let fakeroot = -1;
    let ifAdded = new Array(VetN+1);initArray(ifAdded, VetN, false);
    let priorityQueue = new PriorityQueue(QueueElement, cmp);
    let outputArray = new Array();

    priorityQueue.push(new Node(firstPoint,fakeroot,0));

    while (priorityQueue.length()>0){

        let tmpNode = priorityQueue.pop().element;
        let tmpID = tmpNode.id;

        if (ifAdded[tmpID]){
            priorityQueue.pop();
            continue;
        }

        let weight = graph.matrix.data[tmpID];

        for (let nextId = 1; nextId <= VetN; nextId++){
            if (weight[nextId]!==0 && weight[nextId]!== INF && !ifAdded[nextId]){
                priorityQueue.push(new Node(nextId, tmpID, weight[nextId]));
            }
        }

        weightSum += tmpNode.dis;
        outputArray.push(tmpNode);
        ifAdded[tmpID] = true;
    }
    return [outputArray, weightSum];

}

let ret = minSpanTree(graph,6);
console.log(ret);