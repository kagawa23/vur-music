export function addClass (dom, className) {
  if (hasClass(dom, className)) return
  let newClass = dom.className.split(' ')
  newClass.push(className)
  dom.className = newClass.join(' ')
}

export function hasClass (dom, className) {
  const regex = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return regex.test(dom.className)
}
