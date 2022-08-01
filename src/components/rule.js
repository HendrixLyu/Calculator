import { Status } from "./status";
import { isEmpty } from "../utils";
import { logMaker } from "../utils/log";
import { data } from "./data";

const log = logMaker(false);

class Rule {
  canNotUseFirst = () => {
    if (isEmpty(Status.currentInputDomValue)) {
      log(`${this.canNotUseFirst.name} did not passed`);
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
      log(`${this.canNotUseWithOperator.name} did not passed`);
      return false;
    }
  };

  canNotUseWithPointer = () => {
    const input = Status.currentInputDomValue.split("");
    const lastInput = input.pop();
    if (lastInput === ".") {
      log(`${this.canNotUseWithPointer.name} did not passed`);
      return false;
    }
    log(`${this.canNotUseWithPointer.name} passed`);
    return true;
  };
  
  canNotUseAfterResult = () => {
    log(`${this.canNotUseAfterResult.name} passed`);
    return true;
  };
  firstNotDouble = () => {
    log(`${this.firstNotDouble.name} passed`);
    return true;
  };
  canNotUseIfTheNumAlreadyHavePointer = () => {
    log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} passed`);
    return true;
  };
}

const rule = new Rule();
export { rule };
