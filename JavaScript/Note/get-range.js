function app () {
  let count = 0

  let getAngle = ((len) => {
    let data = {}
    let rules = new Array(len).fill('').map((_, index) => {
      let val = checkVal((index + 1) * 45)
      let min = checkVal(val - 3)
      let max = checkVal(val + 3)

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
  })(8)

  // test
  let text = ''
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 360; j++) {
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
app()
console.timeEnd('app')