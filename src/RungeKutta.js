import { getParser } from "./getParser";

export const RungeKutta = (formula, t0, x0, n, h) => {
  const parser = getParser(formula);
  let values = [{ t: t0, x: x0 }];
  for (let t = t0 + h, i = 0; t <= n * h + t0; t += h, i++) {
    const prev = values[i];

    let ks = [parser.evaluate(`f(${prev.x}, ${prev.t})`)]
    for (let k = 0; k < 3; k++)
      ks.push(parser.evaluate(`f(${prev.x + (k === 2 ? 1 : 0.5) * ks[k] * h}, 
              ${prev.t + (k === 2 ? 1 : 0.5) * h})`));

    values.push({
      t,
      x: prev.x + 1 / 6 * h * (ks.shift() + ks.pop() + ks.reduce((prev, curr) => prev + 2 * curr, 0))
    })
  }
  return values;
}