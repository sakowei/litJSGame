import Point from "./point.js";
import Matrix from "../core/matrix.js";
import {isLink} from "./utils.js";
import {SIZE, MARGIN, BOX_NUM} from "../core/constant.js";
import {points} from "../core/globalData.js";

export default class LinkUP {
  constructor(canvas, ctx) {
    let M = Matrix.getInstance();
    this.matrix = M.matrix;
    this.canvas = canvas;
    this.ctx = ctx;
    this.init();
  }

  init() {
    this.initView();
    this.regEvent(this.canvas, this.ctx);
  }

  initView() {
    const image = new Image();
    image.src = "assets/fruit.png";
    image.onload = () => {
      for (let i = 0; i < BOX_NUM; i++) {
        for (let j = 0; j < BOX_NUM; j++) {
          let point  = new Point(this.ctx, image, i, j, this.matrix[i][j]);
          point.draw();
          points[`${i}${j}`] = point;
        }
      }
    }
  }

  regEvent(canvas, ctx) {
    let first = null;
    canvas.addEventListener('click',(e) => {
      let x = e.offsetX, y = e.offsetY;
      if (x < MARGIN || y < MARGIN
        || x > canvas.width - MARGIN || y > canvas.height - MARGIN) {return}

      let ix = parseInt((x - MARGIN) / SIZE),
        iy = parseInt((y-MARGIN) / SIZE);
      let num = this.matrix[iy][ix];
      
      if (points[`${iy}${ix}`].value === undefined) return;

      if (first) {
        let second = points[`${iy}${ix}`];
        if (num == first.value && isLink(first, second)) {
          first.clear();
          second.clear();
          first.value = undefined;
          second.value = undefined;
        } else {
          first.clear();
          first.draw();
        }
        first = null;
      } else {
        first = points[`${iy}${ix}`];
        ctx.beginPath();
        ctx.rect(first.x, first.y, SIZE, SIZE);
        ctx.strokeStyle = "dodgerblue";
        ctx.stroke();
      }
    });
  }
}
