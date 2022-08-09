const test = require("tape")

const inflation = require("./index")

test("should convert 10 PLN in 1995 to 8.22 in 2021 if no to argument is provided", t => {
  const actual = inflation({ year: 1995, amount: 10 })
  t.equal(actual, 8.22)
  t.end()
})

test("should convert 10 in 1995 to 8.03 in 2010", t => {
  const actual = inflation({ year: 1995, amount: 10 }, { year: 2010 })
  t.equal(actual, 8.03)
  t.end()
})

test("should require a from argument with a year and an amount", t => {
  t.throws(() => inflation(), /from.year must be provided/)
  t.throws(() => inflation({ year: 1995 }), /from.amount must be provided/)
  t.end()
})

test("should only convert prices from 1995 or later", t => {
  t.throws(
    () => inflation({ year: 1900, amount: 1.23 }),
    /from.year must be 1995 or later/
  )
  t.end()
})