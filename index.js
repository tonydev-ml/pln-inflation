const data = require("./gus-cpi-data.json");

const lastFullYear = 2021;
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

function getCpi(year, initialMonth) {
  const month = initialMonth
    ? months.find(m => m.order === initialMonth).abbr
    : "Annual";
  const yearData = data.find(d => d.Year === year);
  return yearData[month];
}

module.exports = function inflation(initialFrom, initialTo) {
  const from = initialFrom || {};
  const to = initialTo || { year: lastFullYear };
  if (!from.year) {
    throw new Error("from.year must be provided");
  } else if (!from.amount) {
    throw new Error("from.amount must be provided");
  } else if (typeof from.year !== "number") {
    throw new Error("from.year must be a number, like 2001");
  } else if (from.year < 1995) {
    throw new Error("from.year must be 1995 or later");
  }

  const fromCpi = getCpi(from.year, from.month);
  const toCpi = getCpi(to.year, to.month);

  const inflationFactor = (toCpi - fromCpi) / fromCpi;
  const inflationValue = inflationFactor * from.amount;
  const currentValue = inflationValue + from.amount;

  return +currentValue.toFixed(2);
}