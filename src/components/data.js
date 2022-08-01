import { Info } from "../data/db.json"; //规则文件
import { pipe } from "lodash/fp";
import { math } from "./math";
import { re } from "mathjs";

class Data {
  constructor(info) {
    this.info = info;
    this.init();
  }
  init() {
    this._getOperator();
    this._getPureOperator();
    this._getInvisible();
    this._getNumber();
    this._getOrder();
  }
  _getOperator() {
    // this.info.filter(info => info.property.includes('property'))
    this.operator = this._getProperty("operator");
    this.operatorID = [];
    this.operator.forEach(info => {
      info.tag ? this.operatorID.push(info.id) : null;
    });
  }
  _getPureOperator() {
    this.pureOperator = this._getProperty("pureOperator");
    this.pureOperatorTag = [];
    this.pureOperator.forEach(info => {
      info.tag ? this.pureOperatorTag.push(info.tag) : null;
    });
    this.pureOperatorReg = this._prepareRegular(this.pureOperatorTag);
  }
  _getInvisible() {
    this.invisible = this._getProperty("invisible");
  }
  _getNumber() {
    this.numberList = this._getProperty("number");
  }
  _getOrder() {
    this.orderList = this.info
      .filter(info => info.order)
      .sort((a, b) => a.order - b.order);
  }
  _getProperty(property) {
    return this.info.filter(info => info.property.includes(property));
  }

  getInputStatus = info => {
    const isPureOperator = this.isThisType(info, "pureOperator");
    const isPoint = this.isThisType(info, "pointer");
    const isEqual = this.isThisType(info, "equal");
    const isNumber = this.isThisType(info, "number");
    const isAddValue = this.isThisType(info, "addValue");
    const isShowResult = this.isThisType(info, "showResult");
    const isClearAll = this.isThisType(info, "clearAll");
    const isClearLast = this.isThisType(info, "clearLast");
    return {
      isPureOperator,
      isPoint,
      isEqual,
      isNumber,
      isAddValue,
      isShowResult,
      isClearAll,
      isClearLast,
    };
  };

  isThisType(info, type) {
    if (info && info.property && Array.isArray(info.property))
      return !!info.property.filter(prop => prop === type).length;

    return false;
  }

  analysisString = (info, optimize = false) => {
    return pipe(this._split, this._optimize(optimize))(info);
  };
  
  _split = info => {
    return info.split(this.pureOperatorReg).filter(e => e !== '');
  };

  _prepareRegular = (tagArray) => {
    const tag = tagArray.map(tag => {
      return tag === "-" ? "\\-" : tag;
    });
    const condition = `([${tag}])`;
    return new RegExp(condition);
  };

  _optimize = (optimize) => (info) => {
    if (!optimize) return info;
    return info.map(element => {
      const elementToNumber = Number(element);
      if (elementToNumber || elementToNumber === 0) {
        return math.calculate(elementToNumber).toString();
      }
      return element;
    });
  };
  
  optimize = (info) => {
    return this._optimize(true)(info);
  };
}

const data = new Data(Info);

export { data };
