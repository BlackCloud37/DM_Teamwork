let Graph = require('../prototypes/graph');

let INF = 32767;
let MAXSIZE = 610;
let UNDEFINEINF = INF;
let twoDArray = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 5, 0, 0],
    [0, 0, 2, 0, 3, 4, 0],
    [0, 0, 5, 3, 0, 2, 3],
    [0, 0, 0, 4, 2, 0, 5],
    [0, 0, 0, 0, 3, 5, 0]
];let graph = new Graph(twoDArray);

function connectiveBranch(graph) {
    let already_searched = new Set();
    let branchList = new Array();

    for (let i = 1; i <= graph.VetN; i++){
        let newBranchSet = new Set();
        if(already_searched.has(i)) continue;
        else {
            let bfsQueue = new Array();
            //BFS
            bfsQueue.push(i);
            while (bfsQueue.length > 0){
                let tmp = bfsQueue.shift();
                if (already_searched.has(tmp)) continue;
                else{
                    newBranchSet.add(i);
                    already_searched.add(i);
                    for (let j = 1;j <= graph.VetN;j++){
                        if (graph.matrix.data[tmp][j]!==0 && graph.matrix.data[tmp][j]!==UNDEFINEINF){
                            newBranchSet.add(j);
                            bfsQueue.push(j);
                        }
                    }
                }
                already_searched.add(tmp);
            }
        }
        branchList.push(newBranchSet);
    }
    return branchList;
}

let ret = connectiveBranch(graph);
console.log(ret);