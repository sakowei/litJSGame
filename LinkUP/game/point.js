import Sprite from "../core/sprite.js";
import {images, IMG_WIDTH, IMG_HEIGHT} from "./image.js";
import {SIZE, MARGIN} from "../core/constant.js";

export default class Point extends Sprite {
  constructor(ctx, image, i, j, value) {
    super(ctx, image, 0, 0, IMG_WIDTH, IMG_HEIGHT, 0, 0, SIZE, SIZE);
    this.i = i;
    this.j = j;
    this.value = value;
    this.x = MARGIN + j * SIZE;
    this.y = MARGIN + i * SIZE;
  }

  draw() {
    this.srcX = images[this.value].x;
    this.srcY = images[this.value].y;
    super.draw();
  }

  clear() {
    this.ctx.clearRect(this.x-1, this.y-1, SIZE+2, SIZE+2);
  }
}
