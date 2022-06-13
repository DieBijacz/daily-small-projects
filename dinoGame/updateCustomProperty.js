export function getCutomProperty(elem, prop) {
  // select style of element and get target property then convert to number
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

export function incrementCustomProperty(elem, prop, increment) {
  setCustomProperty(elem, prop, getCutomProperty(elem, prop) + increment)
}