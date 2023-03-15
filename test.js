const test = require("tape");

const pln = require("./index.js");

// annual_inflation() TESTS
test("should convert 10 PLN in 1995 to 8.95 in 2022 if no to argument is provided", t => {
  const actual = pln.annual_inflation({ year: 1995, amount: 10 });
  t.equal(actual, 8.95);
  t.end();
});

test("should convert 10 in 1995 to 8.03 in 2010", t => {
  const actual = pln.annual_inflation({ year: 1995, amount: 10 }, { year: 2010 });
  t.equal(actual, 8.03);
  t.end();
});

test("should require a from argument with a year and an amount", t => {
  t.throws(() => pln.annual_inflation(), /from.year must be provided/);
  t.throws(() => pln.annual_inflation({ year: 1995 }), /from.amount must be provided/);
  t.end()
});

test("should only convert prices from 1995 or later", t => {
  t.throws(() => pln.annual_inflation({ year: 1900, amount: 1.23 }), /from.year must be 1995 or later/);
  t.end();
});

// monthly inflation() TESTS
test("should convert 10 PLN in January 1995 to 8.95 in [latest month and year of data] if no to argument is provided", t => {
  const actual = pln.monthly_inflation({ year: 1995, month: 1, amount: 10 });
  t.equal(actual, 8.95);
  t.end();
});

test("should convert 10 in January 1995 to 7.88 in September 2001", t => {
  const actual = pln.monthly_inflation({ year: 1995, month: 1, amount: 10 }, { year: 2001, month: 9 });
  t.equal(actual, 7.88);
  t.end();
});

test("should require a from argument with a year, month and an amount", t => {
  t.throws(() => pln.monthly_inflation(), /from.year must be provided/);
	t.throws(() => pln.monthly_inflation({ year: 1995}), /from.month must be provided/);
  t.throws(() => pln.monthly_inflation({ year: 1995, month: 1 }), /from.amount must be provided/);
  t.end()
});

test("should only convert prices from January 1995 or later", t => {
  t.throws(() => pln.monthly_inflation({ year: 1900, month: 1, amount: 1.23 }), /from.year must be 1995 or later/);
	t.throws(() => pln.monthly_inflation({ year: 1994, month: 12, amount: 1.23 }), /from.year must be 1995 or later/);
  t.end();
});
