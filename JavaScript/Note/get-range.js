function app ({blockLength, float}) {
  let count = 0

  let getAngle = ((len) => {
    let data = {}
    let rules = new Array(len).fill('').map((_, index) => {
      let val = checkVal((index + 1) * 360 / len)
      let min = checkVal(val - float)
      let max = checkVal(val + float)

      return {
        val,
        min,
        max
      }
    })

    function checkVal (val) {
      if (val >= 360) {
        return val % 360
      } else if (val < 0) {
        return val % 360 + 360
      }

      return val
    }

    return angle => {
      if (![null, undefined, ].includes(data[angle])) {
        angle = data[angle]
        return angle
      }

      for (let i = 0; i < len; i++) {
        let rule = rules[i]

        let range = rule.max < rule.min

        if (range ? (angle > rule.min || angle < rule.max) : (angle < rule.max && angle > rule.min)) {
          data[angle] = angle = rule.val
          count++

          return angle
        }
      }

      data[angle] = angle
      count++

      return angle
    }
  })(blockLength)

  // test
  let text = ''
  for (let i = 0; i < 3; i++) {
    for (let j = 1; j <= 360; j++) {
      text += `
        <div>
          <span class="angle">${j}=></span>
          <span class="angle">${getAngle(j)}</span>
        </div>
      `
    }
  }

  document.body.innerHTML = text
}

console.time('app')
app({
  blockLength: 8,
  float: 3
})
console.timeEnd('app')
