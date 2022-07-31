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
    calcDelay = 0,
  }) {
    if (toDark) {
      this.switchBtnToDark({ duration: switchBtnDuration });
      this.bgToDark({ duration: bgDuration });
      this.calcToDark({ duration: calcDuration, delay: calcDelay });
    } else {
      this.switchBtnToLight({ duration: switchBtnDuration });
      this.bgToLight({ duration: bgDuration });
      this.calcToLight({ duration: calcDuration, delay: calcDelay });
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
    tween.to("body", { duration, background: css.darkPrimaryColor });
  }
  bgToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to("body", { duration, background: css.lightPrimaryColor });
  }
  calcToDark({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    this.calcBgToDark({ tween, duration });
    this.calcBtnToDark({ tween, duration, delay });
  }
  calcToLight({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    this.calcBgToLight({ tween, duration });
    this.calcBtnToLight({ tween, duration, delay });
  }
  calcBgToDark({ tween = gsap.timeline(), duration = 0 }) {
    tween.to(".calculator", {
      duration,
      boxShadow: css.darkCalculatorBgShadow,
    });
  }
  calcBgToLight({ tween = gsap.timeline(), duration = 0 }) {
    tween.to(".calculator", {
      duration,
      boxShadow: css.lightCalculatorBgShadow,
    });
  }
  calcBtnToDark({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    data.orderList.forEach((btnInfo, index) => {
      this.calcBtnBeforeToDark({ btnInfo, duration, delay: index * delay });
      this.calcBtnGroundToDark({ btnInfo, duration, delay: index * delay });
    });
  }
  calcBtnToLight({ tween = gsap.timeline(), duration = 0, delay = 0 }) {
    [...data.orderList].reverse().forEach((btnInfo, index) => {
      this.calcBtnBeforeToLight({ btnInfo, duration, delay: index * delay });
      this.calcBtnGroundToLight({ btnInfo, duration, delay: index * delay });
    });
  }
  // 按键侧面
  calcBtnGroundToLight({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = `#${btnInfo.id}`;
    let bg = css.lightSpanBackgroundLinear;
    switch (btnInfo.id) {
      case "clear":
        bg = css.clearColor;
        break;
      case "delete":
        bg = css.deleteColor;
        break;
      case "equal":
        bg = css.equalColor;
        break;
    }
    tween.to(id, { duration, delay, bg });
  }
  calcBtnGroundToDark({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = `#${btnInfo.id}`;
    let background = css.darkSpanBackgroundLinear;
    tween.to(id, { duration, delay, background });
  }
  // 按键正面
  calcBtnBeforeToLight({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = `#${btnInfo.id}`;
    let background = css.lightSpanBeforeBackgroundLinear;
    tween.to(id, { duration, delay, background });
  }
  calcBtnBeforeToDark({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {}
}

const animation = new Animation();

export { animation };
