import { Status } from "./status";
import { isEmpty } from "../utils";
import { logMaker } from "../utils/log";
import { data } from "./data";

const log = logMaker(false);

class Rule {
  canNotUseFirst = () => {
    if (isEmpty(Status.currentInputDomValue)) {
      log(`${this.canNotUseFirst.name} did not pass`);
      return false;
    }
    log(`${this.canNotUseFirst.name} passed`);
    return true;
  };

  canNotUseWithOperator = () => {
    const input = Status.currentInputDomValue.split("");
    const lastInput = input.pop();
    let checkStatus = true;
    data.pureOperatorTag.every(tag => {
      if (tag === lastInput) {
        checkStatus = false;
        return false;
      }
      return true;
    });
    if (checkStatus) {
      log(`${this.canNotUseWithOperator.name} passed`);
      return true;
    } else {
      log(`${this.canNotUseWithOperator.name} did not pass`);
      return false;
    }
  };

  canNotUseWithPointer = () => {
    const input = Status.currentInputDomValue.split("");
    const lastInput = input.pop();
    if (lastInput === ".") {
      log(`${this.canNotUseWithPointer.name} did not pass`);
      return false;
    }
    log(`${this.canNotUseWithPointer.name} passed`);
    return true;
  };

  canNotUseAfterResult = () => {
    if (Status.lastInputShowResult) {
      log(`${this.canNotUseAfterResult.name} did not pass`);
      return false;
    }
    log(`${this.canNotUseAfterResult.name} passed`);
    return true;
  };

  firstNotDouble = () => {
    const currentInputTag = Status.currentInputInfo.tag;
    const lastInputGroup = Status.currentInputDomSplit.pop();
    if (lastInputGroup === currentInputTag) {
      log(`${this.firstNotDouble.name} did not pass`);
      return false;
    }
    log(`${this.firstNotDouble.name} passed`);
    return true;
  };

  canNotUseIfTheNumAlreadyHavePointer = () => {
    const lastInputGroup = Status.currentInputDomSplit.pop();
    if (lastInputGroup?.search(/\./) != -1) {
      log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} did not pass`);
      return false;
    }
    log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} passed`);
    return true;
  };
}

const rule = new Rule();
export { rule };
