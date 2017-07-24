/**
 * 将一些比较标准的回掉API转换为Promise
 * 支持如下三种使用方式：
 * const fs = require('fs');
 *
 * 1. const writeFile = mixture(fs.writeFile)
 * 2. const [mkdir, unlink] = mixture([fs.mkdir, fs.unlink])
 * 3. const [readFile, stat] = mixture(fs.readFile, fs.stat)
 */

module.exports = mixture;

function mixture (...funcs) {
  if (funcs.length === 1) {
    if (typeof funcs[0] === 'function') {
      return toPromise(funcs[0])
    }

    [funcs] = funcs
  }

  return funcs.map(toPromise)
}

function toPromise (func) {
  return (...arg) => {
    return new Promise((resolve, reject) => {
      func.apply(this, [].concat(arg, (err, ...data) => {
        if (err) reject(err)
        else resolve(...data)
      }))
    })
  }
}
