import { Status } from "./status";
import { rule } from "./rule";
import { log, logMaker } from "../utils/log";
import { counter } from "../utils/counter";
import { dom } from "./dom";
import { math } from "./math";
import { animation } from "./animation";

class Calculator {
  constructor() {
    this.rule = rule;
  }

  analysisEachTimeInput(currentInputInfo) {
    this._prepareData(currentInputInfo);
    this._checkRules(currentInputInfo) && this._run();
  }

  _prepareData(info) {
    Status.generate(info);
  }

  _checkRules(currentInputInfo) {
    /* log */
    this._checkRulesLog(currentInputInfo);

    let passAllRulesFlag = true;
    currentInputInfo.rule.every(ruleName => {
      const ruleFuncName = this._generateRuleFuncName(ruleName);

      if (this._ruleFuncExecute(ruleFuncName)) {
        passAllRulesFlag &&= this._ruleFuncExecute(ruleFuncName);
      } else {
        /* 没西数，标识设为false */
        passAllRulesFlag = false;
        /* TED49H */
        log(`Cannot find this function: ${ruleFuncName}`, "warn");
      }
      return passAllRulesFlag;
    });
    return passAllRulesFlag;
  }
  /* log */
  _checkRulesLog = currentInputInfo => {
    const value = counter.next().value;
    const tag = currentInputInfo.tag;
    log(`===== Counter: [${value}], Input: ${tag} =====`);
  };
  /* 生成具体的规则西数名 */
  _generateRuleFuncName = ruleFuncName => {
    return `this.rule.${ruleFuncName}`;
  };

  ruleFuncExists = ruleFuncName => {
    return typeof eval(ruleFuncName) === "function";
  };
  /* 执行规则函数 */
  _ruleFuncExecute = ruleFuncName => {
    return eval(ruleFuncName)();
  };

  _run() {
    Status.lastInputShowResult = false
    this._addValue();
    this._showResult();
    this._clearAll();
    this._clearLast();
  }

  _addValue = () => {
    if (Status.currentInputStatus.isAddValue) {
      dom.getInputDom().value += Status.currentInputInfo.tag;
    }
  };
  _showResult = () => {
    if (Status.currentInputStatus.isShowResult) {
      if (!dom.getInputDom().value.length) return;
      const analysisInput = Status.currentInputDomSplitOptimize.join("");
      const calculateResult = math.calculate(analysisInput);

      if (typeof calculateResult === "number") {
        dom.getShowDom().value = analysisInput + "=";
        dom.getInputDom().value = calculateResult;
        animation.textAreaShowHistory();
      }
      Status.lastInputShowResult = true
    }
  };
  _clearAll = () => {
    if (Status.currentInputStatus.isClearAll) {
      if (dom.getInputDom().value.length) {
        dom.getInputDom().value = "";
        this.calculateShowDomValue();
      } else if (dom.getShowDom().value.length) {
        dom.getShowDom().value = "";
        animation.textAreaHideHistory();
      }
    }
  };
  _clearLast = () => {
    if (Status.currentInputStatus.isClearLast) {
      if (dom.getInputDom().value.length) {
        const input = dom.getInputDom().value.split("");
        input.pop();
        dom.getInputDom().value = input.join("");
      }
      if (dom.getShowDom().value.length) {
        this._calculateShowDomValue();
      }
    }
  };

  _calculateShowDomValue = () => {
    const history = dom.getShowDom().value.split("");
    if (history.pop() === "=") {
      dom.getShowDom().value += math.calculate(history.join(""));
    }
  };
}
const calculator = new Calculator();
export { calculator };
