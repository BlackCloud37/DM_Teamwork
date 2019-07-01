var Matrix = require('./matrix');
function Graph(twoDArray) {
        //TODO
        let matrix = new Matrix(twoDArray);
        this.VetN = matrix.size;
        this.EdgeN = 0;
        this.ConnectivityBranchN = 0;
        this.matrix = matrix;

        this.betweenness = 0;
        this.closeness = 0;

        this.nexts = new Array(this.VetN+1);
        for(let i = 1;i<=this.VetN;i++){
            let row = this.matrix.data[i];
            this.nexts[i] = new Array();
            for (let j = 1; j<=this.VetN;j++){
                if (row[j]!==0 && row[j] !== 10000){
                    this.nexts[i].push(parseInt(j));
                }
            }
        }
}
module.exports = Graph;