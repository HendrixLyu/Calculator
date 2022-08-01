import { data } from "./data";
// import {Log, logMaker, log} from '../utils/log'

// const log2 = logMaker(false)
// log2("~hello~hello~")

class Dom {
  text = {
    show: null,
    input: null,
  };
  toggle = {
    sun: null,
    moon: null,
  };
  number = [];
  order = [];
  button = null;
  constructor() {
    this._getTextAreaDom();
    this._getToggleDom();
    this._getNumberDom();
    this._getOrderDom();
    this._getCalculatorDom();
  }
  _getTextAreaDom() {
    this.text.show = this.getById("show");
    this.text.input = this.getById("input");
  }
  _getToggleDom() {
    this.toggle.sun = this.getById("sun");
    this.toggle.moon = this.getById("moon");
  }
  _getNumberDom() {
    const numberList = data.numberList.sort((a, b) => a.number - b.number);
    numberList.forEach(num => {
      this.number.push(this.getById(num.id));
    });
  }
  _getOrderDom() {
    const orderList = data.orderList.sort((a, b) => a.order - b.order);
    orderList.forEach(num => {
      this.order.push(this.getById(num.id));
    });
  }
  _getCalculatorDom() {
    this.button = this.getAll(".calculator span");
  }

  getById(id) {
    return document.getElementById(id);
  }
  getAll(info) {
    return document.querySelectorAll(info);
  }
  get(info) {
    return document.querySelector(info);
  }
  have(info) {
    return !!get(info);
  }
  haveById(id) {
    return !!this.getById(id);
  }
  getInputDom = () => {
    return this.text.input;
  };
  getShowDom = () => {
    return this.text.show;
  };
}

const dom = new Dom();

export { dom };
