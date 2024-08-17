export function cssValue (value, unit = 'px') {
  if (typeof value === 'number') {
    return `${value}${unit}`
  }
  return value // string value
}
/**
 * Parse to css grid template value
 * @param {string[]} values
 * @param {function} map
 */
export function gridValue (values, map) {
  return onlyAvailable(values).map(map || (val => val)).join(' ')
}
export function conditionValue (condition, value) {
  return condition ? value : undefined
}
export function onlyAvailable (list) {
  return list.filter(item => item)
}
