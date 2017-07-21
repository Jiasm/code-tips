/**
 * 将一些比较标准的回掉API转换为Promise
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
      func.apply(this, [].concat(arg, (err, data) => {
        if (err) reject(err)
        else resolve(data)
      }))
    })
  }
}
