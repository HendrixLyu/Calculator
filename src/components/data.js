import { Info } from "../data/db.json";

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
    this.operatorId = [];
    this.operator.forEach(info => {
      info.tag ? this.operatorId.push(info.id) : null;
    });
  }
  _getPureOperator() {
    this.operator = this._getProperty("pureOperator");
    this.pureOperatorTag = [];
    this.operator.forEach(info => {
      info.tag ? this.pureOperatorTag.push(info.tag) : null;
    });
  }
  _getInvisible() {
    this.invisible = this._getProperty("invisible");
  }
  _getNumber() {
    this.number = this._getProperty("number");
  }
  _getOrder() {
    this.orderList = this.info
      .filter(info => info.order)
      .sort((a, b) => a.order - b.order);
  }
  _getProperty(property) {
    return this.info.filter(info => info.property.includes(property));
  }
}

const data = new Data(Info);

export { data };
