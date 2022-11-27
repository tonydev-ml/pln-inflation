# PLN inflation
[![NPMJS registry package version](https://img.shields.io/github/package-json/v/HerrDiesel/pln-inflation/npmjs?color=BB2E3E&label=latest+version)](https://npmjs.com/pln-inflation)
[![Package is also available on npm.pkg.github.com](https://img.shields.io/badge/also%20available%20on-Github_Packages-a371f7)](https://github.com/HerrDiesel/pln-inflation/pkgs/npm/pln-inflation)
[![Snyk Package Health Score](https://snyk.io/advisor/npm-package/pln-inflation/badge.svg?)](https://snyk.io/advisor/npm-package/pln-inflation)

Convert prices in Polish złoty (ISO 4217 code 'PLN') from one year (and month) to another.


## Usage
```js
const pln = require('pln-inflation');
```
### Annual inflation
```js
const current_an = pln.annual_inflation({ year: 1995, amount: 10 });
console.log(`10 zł in 1995 was worth ${current_an} zł in 2021`);

const pis = pln.inflation({ year: 2015, amount: 10 }, { year: 2019 }); // 'inflation()' also works
console.log(`10 zł in 2015 was worth ${pis} zł in 2019`);
```
### Monthly inflation
```js
// Let's assume it's August 2022
const current_mo = pln.monthly_inflation({ year: 1995, month: 1, amount: 10 }); 
console.log(`10 zł in January 1995 was worth ${current_mo} zł in August 2022`);

const kwasniewski = pln.monthly_inflation({ year: 1995, month: 12, amount: 10 }, { year: 2005, month: 12});
console.log(`10 zł in December 1995 was worth ${kwasniewski} zł in December 2005`);
```

## Documentation

There are two functions exported by the library:
- `annual_inflation` (`inflation` also works);
- `monthly_inflation`

Both return the converted price.

### `annual_inflation(from, [to])`

The required `from` argument and the optional `to` argument are similar objects.

#### `from`

- `year` is a year between 1995 and 2021
- `amount` is the nominal price

#### `to` (optional)

- `year` is a year between 1995 and 2021 and defaults to 2021 (the last full year of data)

### `monthly_inflation(from, [to])`

This function is very similiar to `annual_inflation`, but allows conversion with month accuracy.

#### `from`

- `year` is a year between 1995 and 2022
- `month` is a numerical represention of a month (1-12)
- `amount` is the nominal price

#### `to` (optional)

- `year` is a year between 1995 and 2022 and defaults to 2022 (the last year of data)
- `month` is a numerical represention of a month (1-12) and defaults to 10 (the last month of data)

## Data source

All data comes from the [Statistics Poland (Polish: Główny Urząd Statystyczny)](https://stat.gov.pl/obszary-tematyczne/ceny-handel/wskazniki-cen/wskazniki-cen-towarow-i-uslug-konsumpcyjnych-pot-inflacja-/) and is therefore limited to years between 1950 and 2022. However, due to redenomination of Polish złoty in 1995 this package is currently limited to years between 1995 and 2022.

## Prior art and motivation

- I came across ['us-inflation' package](https://www.npmjs.com/package/us-inflation).
- I was inspired by the president of the National Bank of Poland and his statement that ["inflation does not affect the wealth of Polish citizens"](https://youtu.be/njqEBOntE9I) - _I rephrased it a bit for the sake of clarity._
