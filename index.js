const data = require("./gus-cpi-data.json");
const lastFullYearOfData = 2021;
const lastMonthOfData = "Aug";

// ANNUAL INFLATION
function annual_inflation(initialFrom, initialTo) {
  const from = initialFrom || {};
  const to = initialTo || { year: lastFullYearOfData };
  if (!from.year) {
    throw new Error("from.year must be provided");
  } else if (!from.amount) {
    throw new Error("from.amount must be provided");
  } else if (typeof from.year !== "number") {
    throw new Error("from.year must be a number, like 2001");
  } else if (from.year < 1995) {
    throw new Error("from.year must be 1995 or later");
  }

  function getCpi(year) {
    const annual = "Annual";
    const yearData = data.find(d => d.Year === year);
    return yearData[annual];
  }

  const fromCpi = getCpi(from.year);
  const toCpi = getCpi(to.year);

  const inflationFactor = (toCpi - fromCpi) / fromCpi;
  const inflationValue = inflationFactor * from.amount;
  const currentValue = inflationValue + from.amount;

  return +currentValue.toFixed(2);
}

// MONTHLY INFLATION
function monthly_inflation(initialFrom, initialTo){
  const from = initialFrom || {};
  const to = initialTo || { year: lastFullYearOfData, month: lastMonthOfData};
  if (!from.year) {
    throw new Error("from.year must be provided");
  } else if (!from.amount) {
    throw new Error("from.amount must be provided");
  } else if (typeof from.year !== "number") {
    throw new Error("from.year must be a number, like 2001");
  } else if (from.year < 1995) {
    throw new Error("from.year must be 1995 or later");
  }
  const months = [
    { abbr: "Jan", name: "January", nazwa: "Styczeń", order: 1 },
    { abbr: "Feb", name: "February", nazwa: "Luty", order: 2 },
    { abbr: "Mar", name: "March", nazwa: "Marzec", order: 3 },
    { abbr: "Apr", name: "April", nazwa: "Kwiecień", order: 4 },
    { abbr: "May", name: "May", nazwa: "Maj", order: 5 },
    { abbr: "Jun", name: "June", nazwa: "Czerwiec", order: 6 },
    { abbr: "Jul", name: "July", nazwa: "Lipiec", order: 7 },
    { abbr: "Aug", name: "August", nazwa: "Sierpień", order: 8 },
    { abbr: "Sep", name: "September", nazwa: "Wrzesień", order: 9 },
    { abbr: "Oct", name: "October", nazwa: "Październik", order: 10 },
    { abbr: "Nov", name: "November", nazwa: "Listopad", order: 11 },
    { abbr: "Dec", name: "December", nazwa: "Grudzień", order: 12 }
  ];

  function getCpi(input_year, input_month) {
    const month = input_month
      ? months.find(m => m.order === input_month).abbr
      : "Dec";
    const yearData = data.find(d => d.Year === input_year);
    return yearData[month];
  }

  const fromCpi = getCpi(from.year, from.month);
  const toCpi = getCpi(to.year, to.month);

  const inflationFactor = (toCpi - fromCpi) / fromCpi;
  const inflationValue = inflationFactor * from.amount;
  const currentValue = inflationValue + from.amount;

  return +currentValue.toFixed(2);
}

module.exports.inflation = annual_inflation; // soon to be deprecated!
module.exports.annual_inflation = annual_inflation;
module.exports.monthly_inflation = monthly_inflation;