import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

gsap.registerPlugin(CSSRulePlugin);

import { data } from "./data";
import { css } from "./css";

class Animation {
  btnPress(dom) {
    if (dom) {
      dom.classList.remove("mousedown");
      dom.classList.add("mousedown");
    } else {
      console.log("cannot find Dom");
    }
  }
  btnRelease(dom) {
    if (dom) {
      dom.classList.remove("mousedown");
    } else {
      console.log("cannot find Dom");
    }
  }
  switchTheme({
    toDark = true,
    switchBtnDuration = 0,
    bgDuration = 0,
    calcDuration = 0,
  }) {
    if (toDark) {
      this.switchBtnToDark({ duration: switchBtnDuration });
      this.bgToDark({ duration: bgDuration });
      this.calcToDark({ duration: calcDuration });
    } else {
      this.switchBtnToLight({ duration: switchBtnDuration });
      this.bgToLight({ duration: bgDuration });
      this.calcToLight({ duration: calcDuration });
    }
  }
  switchBtnToLight({ tween = gsap.timeline(), duration = 0 }) {
    // const tween = gsap.timeline();
    tween.to("#sun", {
      duration,
      ease: "power2",
      y: 40,
      opacity: 0,
      display: "none",
    });
    tween.to("#moon", {
      duration: 0,
      ease: "power2",
      y: -40,
      opacity: 0,
      display: "none",
    });
    tween.to("#moon", {
      duration,
      ease: "power2",
      y: 0,
      opacity: 1,
      display: "block",
    });
  }
  switchBtnToDark({ tween = gsap.timeline(), duration = 0 }) {
    // const tween = gsap.timeline();
    tween.to("#moon", {
      duration,
      ease: "power2",
      y: 40,
      opacity: 0,
      display: "none",
    });
    tween.to("#sun", {
      duration: 0,
      ease: "power2",
      y: -40,
      opacity: 0,
      display: "none",
    });
    tween.to("#sun", {
      duration,
      ease: "power2",
      y: 0,
      opacity: 1,
      display: "block",
    });
  }
  bgToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('body', {duration, background:css.darkPrimaryColor})
  }
  bgToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to('body', {duration, background:css.lightPrimaryColor})
  }
  calcToDark({ tween = gsap.timeline(), duration = 0 }) {
    
  }
  calcToLight({ tween = gsap.timeline(), duration = 0 }) {

  }
}

const animation = new Animation();

export { animation };
