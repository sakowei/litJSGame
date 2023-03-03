const cvs = document.querySelector("#app");
const ctx = cvs.getContext('2d');

import LinkUP from "./game/linkUP.js";

new LinkUP(cvs, ctx);
