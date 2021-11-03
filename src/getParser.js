import * as math from 'mathjs';

export const getParser = formula => {
  const parser = math.parser();
  parser.evaluate(`f(x, t) = ${formula}`)
  return parser;
};