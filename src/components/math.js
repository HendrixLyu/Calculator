import { create, all } from "mathjs";
import { logMaker } from "../utils/log";
const log = logMaker()

const math = create(all, {});

math.config({
  number: "BigNumber", //变成大数
  precision: 64, //精度
});

math.calculate = (expression) => {
  const result = Number(math.evaluate(expression));
  log(`math.calculate: ${result}`);
  return result;
};

export { math };
