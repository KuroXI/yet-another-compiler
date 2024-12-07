export const dataTypes = {
  STRING: /^"([^"\\]|\\.)*"$/,
  INT: /^[+-]?\d+$/,
  BOOLEAN: /^(true|false)$/,
  CHAR: /^'([^\\']|\\.)'$/,
  DOUBLE: /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/
}
