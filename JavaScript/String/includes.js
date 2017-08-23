'use strict'

String.prototype.includes = function (str) {
  return !!~this.indexOf(str)
}


