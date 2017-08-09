'use strict'

function add (nLeft, nRight) {

  if (/^\d+$/.test(nLeft) && /^\d+$/.test(nRight)) return +nLeft + +nRight

  let reg = /\.(\d*)$/

  nLeft = `${nLeft}`
  nRight = `${nRight}`

  if (!reg.test(nLeft)) {
    nLeft = `${nLeft}.`
  } else if (!reg.test(nRight)) {
    nLeft = `${nRight}.`
  }

  let leftLen = nLeft.length
  let rightLen = nRight.length
  let leftDecimalLen = nLeft.match(reg)[1].length
  let leftNumberLen = leftLen - leftDecimalLen
  let rightDecimalLen = nRight.match(reg)[1].length
  let rightNumberLen = rightLen - rightDecimalLen
  let decimalLen = Math.max(leftDecimalLen, rightDecimalLen)
  let maxLen = Math.max(leftLen, rightLen)

  nLeft = nLeft.padEnd(leftNumberLen + decimalLen, 0)
  nRight = nRight.padEnd(rightNumberLen + decimalLen, 0)

  let index = decimalLen
  let result = new Array(decimalLen)
  let temp = new Array(decimalLen).fill(0)
  let leftArr = nLeft.match(/\.(\d+)$/)[1].split('')
  let rightArr = nRight.match(/\.(\d+)$/)[1].split('')
  let overflow = 0

  while (index--) {
    let l = leftArr[index] || 0
    let r = rightArr[index] || 0
    let t = temp[index] || 0

    let num = result[index] = +l + +r + +t

    if (num >= 10) {
      result[index] = num % 10

      num = num / 10 | 0
      if (index === 0) {
        overflow = num
      } else {
        temp[index - 1] = num
      }
    }
  }

  return `${parseInt(nLeft) + parseInt(nRight) + overflow}.${result.join('')}`
}

console.log(add(1, 2))
console.log(add(1, 0.2))
console.log(add(0.1, 0.2))
console.log(add(233333.1, 0.215125125155))
