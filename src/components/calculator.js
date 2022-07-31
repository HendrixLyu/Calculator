import { Status } from "./status";
// import { rule } from "./rule";
import { log, logMaker } from "../utils/log";
import { counter } from "../utils/counter";
import { dom } from "./dom";
import { math } from "./math";
import { animation } from "./animation";

class Calculator {
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

    // let passAllRulesFlag = true;
    // currentInputInfo.rule.every(ruleName => {
    //   const ruleFuncName = this._generateRuleFuncName(ruleName);

    //   if (this._ruleFuncExecute(ruleFuncName)) {
    //     passAllRulesFlag &&= this._ruleFuncExecute(ruleFuncName);
    //   } else {
    //     /* 没西数，标识设为false */
    //     passAllRulesFlag = false;
    //     /* TED49H */
    //     log(`Cannot find this function: ${ruleFuncName}`, "warn");
    //   }
    //   return passAllRulesFlag;
    // });
    // return passAllRulesFlag;
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
}
const calculator = new Calculator();
export { calculator };
