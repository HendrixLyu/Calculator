import { create, all } from "mathjs";

const math = create(all, {});

math.config({
  number: "BigNumber",
  precision: 64,
});
math.calculate = (expression) => {
  const result = Number(math.evaluate(expression))
  log(`math.calculate: ${result}`);
  return result
}

export {math}