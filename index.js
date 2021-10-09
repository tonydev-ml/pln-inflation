const data = require("./gus-cpi-data.json");

const lastFullYear = 2020;

function getCpi(year) {
  const annual = "Annual";
  const yearData = data.find(d => d.Year === year);
  return yearData[annual];
}

module.exports = function inflation(initialFrom, initialTo) {
  const from = initialFrom || {}
  const to = initialTo || { year: lastFullYear }
  if (!from.year) {
    throw new Error("from.year must be provided");
  } else if (!from.amount) {
    throw new Error("from.amount must be provided");
  } else if (typeof from.year !== "number") {
    throw new Error("from.year must be a number, like 2001");
  } else if (from.year < 1995) {
    throw new Error("from.year must be 1995 or later");
  }

  const fromCpi = getCpi(from.year, from.annual);
  const toCpi = getCpi(to.year, to.annual);

  const inflationFactor = (toCpi - fromCpi) / fromCpi;
  const inflationValue = inflationFactor * from.amount;
  const currentValue = inflationValue + from.amount;

  return +currentValue.toFixed(2);
}
