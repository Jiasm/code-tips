'use strict'

/**
 * change number with commas
 * example: `1234567`
 *   1. 1^234567   // /(\d{3})+(?!\d)/.test(234567) => true
 *   2. 1,234^567  // /(\d{3})+(?!\d)/.test(567) => true
 *   3. result: 1,234,567 
 */

function numberWithCommas (num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

console.log(numberWithCommas(1))
console.log(numberWithCommas(12))
console.log(numberWithCommas(123))
console.log(numberWithCommas(1234))
console.log(numberWithCommas(12345))
console.log(numberWithCommas(123456))
console.log(numberWithCommas(1234567))
