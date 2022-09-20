const data = require("./gus-cpi-data.json");
const latestAnnualData = 2021; // year
const latestMonthlyData = {year: 2022, month: 8}; // year and month

// ANNUAL INFLATION
function annual_inflation(initialFrom, initialTo) {
  const from = initialFrom || {};
  const to = initialTo || { year: latestAnnualData };
  
  if(!from.year){
    throw new Error("from.year must be provided");
  }else if(!from.amount){
    throw new Error("from.amount must be provided");
  }else if(typeof from.year !== "number"){
    throw new Error("from.year must be a number, like 2001");
  }else if(from.year < 1995){
    throw new Error("from.year must be 1995 or later");
  }

  function getCpi(year) {
    const yearData = data.find(d => d.Year === year);
    return yearData["Annual"];
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
  const to = initialTo || { year: latestMonthlyData.year, month: latestMonthlyData.month};
  
  if(!from.year){
    throw new Error("from.year must be provided");
  }else if(!from.month){
    throw new Error("from.month must be provided");
  }else if(!from.amount){
    throw new Error("from.amount must be provided");
  }else if(typeof from.year !== "number"){
    throw new Error("from.year must be a number, like 2001");
  }else if(typeof from.month !== "number"){
    throw new Error("from.month must be a number from 1 to 12 (months)");
  }else if(from.year < 1995){
    throw new Error("from.year must be 1995 or later");
  }

  function getCpi(year, month) {
    const yearData = data.find(d => d.Year === year);
    return yearData.Monthly[month-1];
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