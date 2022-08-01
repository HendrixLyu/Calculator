import { data } from "./data";
import { dom } from "./dom";

class Status {
  static currentInputInfo = null;
  static currentInputStatus = Status._getEachTimeInputStatus();
  static currentInputDomValue = Status.getInputDomValue();
  static currentInputDomSplit = Status.getInputDomValueSplit();
  static currentInputDomSplitOptimize = Status._getInputDomValueSplitOptimize();
  static lastInputShowResult = false;

  static generate(currentInputInfo) {
    Status.currentInputInfo = currentInputInfo;
    Status.currentInputStatus = Status._getEachTimeInputStatus();
    Status.currentInputDomValue = Status.getInputDomValue();
    Status.currentInputDomSplit = Status.getInputDomValueSplit();
    Status.currentInputDomSplitOptimize =
      Status._getInputDomValueSplitOptimize();
  }

  static _getEachTimeInputStatus() {
    return data.getInputStatus(Status.currentInputInfo);
  }
  static getInputDomValue() {
    return dom.getInputDom().value;
  }
  static getInputDomValueSplit(optimize = false) {
    return data.analysisString(Status.getInputDomValue(), optimize);
  }
  static _getInputDomValueSplitOptimize() {
    return data.optimize(Status.currentInputDomSplit);
  }
}

export { Status };
