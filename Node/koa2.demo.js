const Koa = require('koa')

let app = new Koa()

app.use(async (ctx, next) => {
  console.log('middleware 1 step 1')                        // step 1
  await next()                                              // jump to next middleware
  console.log('middleware 1 step 2 with result:', ctx.name) // step 7
  ctx.body = ctx.name                                       // response
})

app.use(async (ctx, next) => {
  console.log('middleware 2 step 1')                        // step 2
  await next()                                              // jump to next middleware
  console.log('middleware 2 step 2')                        // step 6
})

app.use(async (ctx, next) => {
  console.log('middleware 3 step 1')                        // step 3
  let result = await getData()                              // get data
  console.log('get result:', result)                        // step 4
  ctx.name = result                                         // set result in context
  await next()                                              // jump to next middleware
  console.log('middleware 3 step 2')                        // step 5
})

app.listen(3000, () => {
  console.log('listen on 3000')
})

function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Niko')
    }, 4000)
  })
}
