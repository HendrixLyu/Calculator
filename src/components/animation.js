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
    let background = css.lightSpanBackgroundLinear;
    switch (btnInfo.id) {
      case "clear":
        background = css.clearColor;
        break;
      case "delete":
        background = css.deleteColor;
        break;
      case "equal":
        background = css.equalColor;
        break;
    }
    tween.to(id, { duration, delay, background });
  }
  calcBtnGroundToDark({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = `#${btnInfo.id}`;
    let background = css.darkSpanBackgroundLinear;
    switch (btnInfo.id) {
      case "clear":
        background = css.clearDeepColor;
        break;
      case "delete":
        background = css.deleteDeepColor;
        break;
      case "equal":
        background = css.equalDeepColor;
        break;
    }
    tween.to(id, { duration, delay, background });
  }
  // 按键正面
  calcBtnBeforeToLight({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = CSSRulePlugin.getRule(`#${btnInfo.id}::before`);
    // let background = css.lightSpanBeforeBackgroundLinear;
    tween.to(id, {
      duration,
      delay,
      color: css.lightTextColor,
      textShadow: css.lightTextShadow,
      background: css.lightSpanBeforeBackgroundLinear,
      boxShadow: css.lightSpanBeforeBoxShadow,
      borderTop: css.lightSpanBeforeBorder,
      borderBottom: css.lightSpanBeforeBorder,
      borderLeft: css.lightSpanBeforeBorder,
    });
  }
  calcBtnBeforeToDark({
    btnInfo,
    tween = gsap.timeline(),
    duration = 0,
    delay = 0,
  }) {
    const id = CSSRulePlugin.getRule(`#${btnInfo.id}::before`);
    // let background = css.lightSpanBeforeBackgroundLinear;
    tween.to(id, {
      duration,
      delay,
      color: css.darkTextColor,
      textShadow: css.darkTextShadow,
      background: css.darkSpanBeforeBackgroundLinear,
      boxShadow: css.darkSpanBeforeBoxShadow,
      borderTop: css.darkSpanBeforeBorder,
      borderBottom: css.darkSpanBeforeBorder,
      borderLeft: css.darkSpanBeforeBorder,
    });
  }
}

const animation = new Animation();

export { animation };
