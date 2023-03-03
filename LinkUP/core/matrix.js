import {BOX_NUM, OBJ_NUM} from "./constant.js";
let objectNum = OBJ_NUM;
export default class Matrix {
  constructor() {
    this.array = this.getArray();
    this.matrix = this.getMatrix();
  }

  getArray() {
    let total = BOX_NUM * BOX_NUM;
    let arr = [], first = true;
    for (let i = 0; i < total; i++) {
      if (objectNum < 0) objectNum = OBJ_NUM;
      // first ? arr.push(objectNum) : arr.push(objectNum--);
      if (first) {
        arr.push(objectNum);
      } else {
        arr.push(objectNum--);
      }
      first = !first;
    }
    return arr;
  }

  shuffle() {
    this.array.sort( () => {
      return .5 - Math.random();
    });
  }

  getMatrix() {
    this.shuffle();
    let matrix = [];
    for (let i = 0; i < BOX_NUM; i++) {
      matrix.push(this.array.slice(i*BOX_NUM, (i+1)*BOX_NUM));
    }
    return matrix;
  }

  static getInstance() {
    if (!Matrix.instance) {
      Matrix.instance = new Matrix();
    }
    return Matrix.instance;
  }
}
