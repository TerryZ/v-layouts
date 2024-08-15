export function cssValue (value, unit = 'px') {
  if (typeof value === 'number') {
    return `${value}${unit}`
  }
  return value // string value
}
/**
 * Parse to css grid template value
 * @param {string[]} values
 */
export function gridValue (values) {
  return values.filter(val => val).join(' ')
}
export function conditionValue (condition, value) {
  return condition ? value : undefined
}
