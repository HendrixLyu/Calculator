import "./style.css";

import { data } from "./src/components/data";
import { dom } from "./src/components/dom";
import { animation } from "./src/components/animation";

console.log(data);
console.log(dom);

data.info.forEach(e => {
  if (dom.haveById(e.id)) {
    document.styleSheets[0].insertRule(`#${e.id}::before{
      content:"${e.tag}"
    }`);
  }
});

dom.button.forEach(btnDom => {
  btnDom.addEventListener("mousedown", () => {
    animation.btnPress(btnDom);
  });
  btnDom.addEventListener("mouseup", () => {
    animation.btnRelease(btnDom);
  });
  btnDom.addEventListener("mouseout", () => {
    animation.btnRelease(btnDom);
  });
});

data.info.forEach(info => {
  window.addEventListener("keydown", e => {
    info.key.forEach(key => {
      if (e.key === key && dom.getById(info.id)) {
        animation.btnPress(dom.getById(info.id));
      }
    });
  });
  window.addEventListener("keyup", e => {
    info.key.forEach(key => {
      if (e.key === key && dom.getById(info.id)) {
        animation.btnRelease(dom.getById(info.id));
      }
    });
  });
});

dom.toggle.sun.addEventListener("click", () => {
  animation.switchTheme({
    toDark: false,
    switchBtnDuration: 0.6,
    bgDuration: 1.0,
  });
});
dom.toggle.moon.addEventListener("click", () => {
  animation.switchTheme({
    toDark: true,
    switchBtnDuration: 0.6,
    bgDuration: 1.0,
  });
});
