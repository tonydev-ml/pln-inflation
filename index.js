const data = require("./gus-cpi-data.json");
const latestAnnualData = latest_cpi().yearly.year_id; // year
const latestMonthlyData = {year: latest_cpi().monthly.year_id, month: latest_cpi().monthly.month_id}; // year and month

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
  }else if(from.year > latestAnnualData){
    throw new Error("from.year must be "+latestAnnualData+" or earlier");
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
  }else if(from.year > latestMonthlyData.year){
    throw new Error("from.year must be "+latestMonthlyData.year+" or earlier");
  }else if(from.year == latestMonthlyData.year && from.month > latestMonthlyData){
    throw new Error("from.month must be "+latestMonthlyData.month+" or earlier");
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

// LATEST CPI
function latest_cpi(){
  const yearly_data = function(){
    if(data[data.length-1].Annual == 100) return {year_id: data[data.length-2].Year, value: data[data.length-2].Annual};
    else return {year_id: data[data.length-1].Year, value: data[data.length-1].Annual};
  };
  const monthly_data = function(){
    if(data[data.length-1].Monthly.length > 0) return {year_id: data[data.length-1].Year, month_id: data[data.length-1].Monthly.length, value: data[data.length-1].Monthly[data[data.length-1].Monthly.length-1]}
    else return {year_id: data[data.length-2].Year, month_id: data[data.length-2].Monthly.length, value: data[data.length-2].Monthly[data[data.length-2].Monthly.length-1]}
  };

  const latest_cpi_data = {
    monthly: {
      year_id: monthly_data().year_id, // literally just a *year*, for example: 2023
      month_id: monthly_data().month_id, // 1-12
      value: monthly_data().value // CPI for this month
    },
    yearly: {
      year_id: yearly_data().year_id,
      value: yearly_data().value
    }
  };

  return latest_cpi_data;
}

// MODULE EXPORTS
module.exports.inflation = annual_inflation;
module.exports.annual_inflation = annual_inflation;
module.exports.monthly_inflation = monthly_inflation;
module.exports.latest_cpi = latest_cpi;
