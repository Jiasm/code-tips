function isNull (arg) {
  return [null, undefined, ].includes(arg)
}

console.log(isNull())
console.log(isNull(0))
console.log(isNull(1))
console.log(isNull(null))
console.log(isNull(undefined))
console.log(isNull(({}).unknownKey))

if (typeof module === 'undefined') {
  window.isNull = isNull
} else {
  module.exports = isNull
}
