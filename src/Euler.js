import { getParser } from "./getParser";

export const Euler = (formula, t0, x0, n, h) => {
  const parser = getParser(formula);
  let values = [{ t: t0, x: x0 }];
  for (let t = t0 + h, i = 0; t <= n * h + t0; t += h, i++) {
      const prev = values[i];
      values.push({
        t,
        x: prev.x + h * parser.evaluate(`f(${prev.x}, ${prev.t})`)
      })
  }
  return values;
};