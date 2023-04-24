# PLN inflation
[![NPMJS registry package version](https://img.shields.io/github/package-json/v/HerrDiesel/pln-inflation?color=BB2E3E&label=latest+version)](https://npmjs.com/pln-inflation)
[![Snyk Package Health Score](https://snyk.io/advisor/npm-package/pln-inflation/badge.svg?)](https://snyk.io/advisor/npm-package/pln-inflation)

Convert prices in Polish złoty (ISO 4217 code 'PLN') from one year (and month) to another.

Konwertuj ceny w złotówkach (zł; kod ISO 4217 'PLN') pod kątem rocznej i miesięcznej inflacji.


## Usage
```js
const pln = require('pln-inflation');
```
### Annual inflation
```js
// Let's assume it's 2022
let current = pln.annual_inflation({ year: 1995, amount: 10 });
console.log(`10 zł in 1995 was worth ${current} zł in 2022`);

let pis = pln.inflation({ year: 2015, amount: 10 }, { year: 2019 }); // 'inflation()' also works
console.log(`10 zł in 2015 was worth ${pis} zł in 2019`);
```
### Monthly inflation
```js
// Let's assume it's August 2022
let current = pln.monthly_inflation({ year: 1995, month: 1, amount: 10 }); 
console.log(`10 zł in January 1995 was worth ${current} zł in August 2022`);

let kwasniewski = pln.monthly_inflation({ year: 1995, month: 12, amount: 10 }, { year: 2005, month: 12});
console.log(`10 zł in December 1995 was worth ${kwasniewski} zł in December 2005`);
```

## Documentation

There are three functions exported by the library:
- `annual_inflation` (`inflation` also works);
- `monthly_inflation`
- `latest_cpi`

First two return the converted price.

### `annual_inflation(from, [to])`

The required `from` argument and the optional `to` argument are similar objects.

#### `from`

- `year` is a year ≥1995
- `amount` is the nominal price

#### `to` (optional)

- `year` is a year ≥1995 and defaults to the [last year of yearly inflation data](#latest_cpi)

### `monthly_inflation(from, [to])`

This function is very similiar to `annual_inflation`, but allows conversion with month accuracy.

#### `from`

- `year` is a year ≥1995
- `month` is a numerical represention of a month (1-12)
- `amount` is the nominal price

#### `to` (optional)

- `year` is a year ≥1995 and defaults to the [last year of monthly inflation data](#latest_cpi)
- `month` is a numerical represention of a month (1-12) and defaults to  the [last month of monthly inflation data](#latest_cpi)

### `latest_cpi()`

This function returns an object containing two properties, which are also objects:

- `yearly` has two properties:
    - `year_id` is the last year of yearly inflation data
    - `value` is the CPI for the aforementioned year
- `monthly` has three properties:
    - `year_id` is the last year of monthly inflation data
    - `month_id` is a numerical represention of the last month of monthly inflation data (1-12)
    - `value` is the CPI for the aforementioned month

```js
const latest = pln.latest_cpi();

let month = latest.monthly.month_id;
let year = latest.monthly.year_id;

console.log(`This package currently offers conversion from 1995-01 to ${year}-${month}`);
```

## Data source

All data comes from the [Statistics Poland (Polish: Główny Urząd Statystyczny)](https://stat.gov.pl/obszary-tematyczne/ceny-handel/wskazniki-cen/wskazniki-cen-towarow-i-uslug-konsumpcyjnych-pot-inflacja-/) and is therefore limited to years past 1950. However, due to redenomination of Polish złoty in 1995 this package is currently limited to years from 1995.

## Prior art and motivation

- I came across ['us-inflation' package](https://www.npmjs.com/package/us-inflation).
- I was inspired by the president of the National Bank of Poland and his statement that ["inflation does not affect the wealth of Polish citizens"](https://youtu.be/njqEBOntE9I) - _I rephrased it a bit for the sake of clarity._
