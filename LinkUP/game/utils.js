import {BOX_NUM} from "../core/constant.js";
import {points} from '../core/globalData.js';

function isNeighbor(num1, num2) {
  return Math.abs(num1 - num2) == 1;
}

function isBorder(num) {
  return num == 0 || num == BOX_NUM - 1;
}

function isLinearH(i, j1, j2) {
  let min = (j1 > j2) ? j2 : j1;
  let sub = Math.abs(j1-j2);
  let temp = 1;
  while (temp < sub) {
    if (points[`${i}${min+temp}`].value !== undefined) {
     return false; 
    }
    temp++;
  }
  return true;
}

function isLinearV(j, i1, i2) {
  let min = (i1 > i2) ? i2 : i1;
  let sub = Math.abs(i1-i2);
  let temp = 1;
  while (temp < sub) {
    if (points[`${min+temp}${j}`].value !== undefined) {
      return false;
    }
    temp++;
  }
  return true;
}

function isSimpleLink(p1, p2, allowBorder) {
  if (p1.i == p2.i) {
    if (isNeighbor(p1.j, p2.j)) return true;
    if (allowBorder && isBorder(p1.i)) return true;
    if (isLinearH(p1.i, p1.j, p2.j)) return true;
  }
  if (p1.j == p2.j) {
    if (isNeighbor(p1.i, p2.i)) return true;
    if (allowBorder && isBorder(p1.j)) return true;
    if (isLinearV(p1.j, p1.i, p2.i)) return true;
  }
  return false;
}

function isOneCornerLink(p1,p2) {
  let c;
  if(points[`${p1.i}${p2.j}`].value === undefined){
    c = points[`${p1.i}${p2.j}`];
    if((isSimpleLink(p1,c) && isSimpleLink(p2,c,true))
      || (isSimpleLink(p1,c,true) && isSimpleLink(p2,c))) return true;
  }
  if(points[`${p2.i}${p1.j}`].value === undefined){
    c = points[`${p2.i}${p1.j}`];
    if((isSimpleLink(p1,c) && isSimpleLink(p2,c,true))
      || (isSimpleLink(p1,c,true) && isSimpleLink(p2,c))) return true;
  }
  return false;
}

function isTwoCornersLink(p1,p2){
  let c1, c2;

  for (let j=0; j < BOX_NUM; j++){
    if (points[`${p1.i}${j}`].value !== undefined) continue;
    if (points[`${p2.i}${j}`].value !== undefined) continue;
    c1 = points[`${p1.i}${j}`];
    c2 = points[`${p2.i}${j}`];
    if (isSimpleLink(p1,c1) 
      && isSimpleLink(c1,c2,true) 
      && isSimpleLink(p2,c2)) return true;
  }

  for (let i=0; i < BOX_NUM; i++){
    if (points[`${i}${p1.j}`].value !== undefined) continue;
    if (points[`${i}${p2.j}`].value !== undefined) continue;
    c1 = points[`${i}${p1.j}`];
    c2 = points[`${i}${p2.j}`];
    if (isSimpleLink(p1,c1) 
        && isSimpleLink(c1,c2,true) 
        && isSimpleLink(p2,c2)) return true;
  }

  return false;
}

export function isLink(p1,p2) {
  if (isSimpleLink(p1,p2,true)) return true;
  if (isOneCornerLink(p1,p2)) return true;
  if (isTwoCornersLink(p1,p2)) return true;
  return false;
}
