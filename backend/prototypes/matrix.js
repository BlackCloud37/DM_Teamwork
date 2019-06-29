function Matrix(twoDArray) {
    let INF = 32767;
    let UNDEFINEINF = 10000;

    if (twoDArray.length !== twoDArray[0].length){//正向表
        throw "Matrix Creating Error : Not a square."
    }
    else {
        if (twoDArray instanceof Array && twoDArray.length > 0 && twoDArray[0] instanceof Array) {
            let flag = true;
            for (let i = 0; i < twoDArray[0].length; i++) {
                if (twoDArray[0][i] !== 0) {
                    flag = false;
                    break;
                }
            }
            if (!flag) {
                this.size = twoDArray.length;
                this.data = twoDArray;
                this.data.splice(0, 0, new Array(this.size));
                for (let i = 0; i < this.size + 1; i++) {
                    this.data[i].splice(0, 0, 0);
                }
            } else {
                this.size = twoDArray.length - 1;
                this.data = twoDArray;
            }
        } else {
            throw "Matrix Creating Error : Not a 2DArray."
        }
    }
}
module.exports = Matrix;