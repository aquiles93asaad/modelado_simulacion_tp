import { getParser } from "./getParser";

export const EulerMejorado = (formula, t0, x0, n, h) => {
  const parser = getParser(formula);
  let values = [{ t: t0, x: x0 }];
  for (let t = t0 + h, i = 0; t <= n * h + t0; t += h, i++) {
    const prev = values[i];
    const predictor = prev.x + h * parser.evaluate(`f(${prev.x}, ${prev.t})`);
    const corrector = prev.x + h * 0.5 * (parser.evaluate(`f(${prev.x}, ${prev.t})`)
      + parser.evaluate(`f(${predictor}, ${t})`));
    values.push({
      t,
      x: corrector
    })
  }
  return values;
}