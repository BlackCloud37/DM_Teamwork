let Graph = require('../prototypes/graph');
let PriorityQueue = require('../prototypes/queue');
let INF = 32767;
let MAXSIZE = 610;
let shtDis = new Array(MAXSIZE);
function QueueElement(element) {this.element = element;this.priority = element;}
function cmp(a,b) {return shtDis[a] <= shtDis[b];}
function initArray(arr, size, value) {for (let i = 0; i <= size; i++) arr[i] = value;}


let twoDArray = [
    [0,1,2],
    [1,0,1],
    [2,1,0]
];let graph = new Graph(twoDArray);


function betweenness(graph) {
    let VetN = graph.VetN;
    let betweennessArr = new Array(VetN+1);initArray(betweennessArr, VetN, 0);
    let sigma = new Array(VetN+1);
    let delta = new Array(VetN+1);

    for (let s = 1; s <= VetN; s++){
        let S = [], P = [];
        for(let i = 0; i <= VetN; i++)P.push([]);
        let priorityQueue = new PriorityQueue(QueueElement, cmp);
        initArray(sigma, VetN,0); sigma[s] = 1;
        initArray(shtDis, MAXSIZE, INF); shtDis[s] = 0;

        priorityQueue.push(s);
        while (priorityQueue.length() > 0){
            let tmpId = priorityQueue.pop().element;
            S.push(tmpId);
            let weight = graph.matrix.data[tmpId];
            for (let nextId = 1; nextId <= VetN; nextId++){
                if (weight[nextId] !== 0 && weight[nextId]!==INF){
                    if (shtDis[nextId] > shtDis[tmpId] + weight[nextId]){
                        shtDis[nextId] = shtDis[tmpId] + weight[nextId];
                        priorityQueue.push(nextId);
                    }
                    if (shtDis[nextId] === shtDis[tmpId] + weight[nextId]){
                        sigma[nextId] += sigma[tmpId];
                        P[nextId].push(tmpId);
                    }
                }
            }
        }
        initArray(delta,VetN,0);
        while (S.length > 0){
            let w = parseInt(S.pop());
            for (let v of P[w]){v = parseInt(v);
                delta[v] += sigma[v]/sigma[w]*(1+delta[w]);
                if (w !== s){
                    betweennessArr[w] += delta[w];
                }
            }
        }
    }

    return betweennessArr;
}
module.exports = betweenness;