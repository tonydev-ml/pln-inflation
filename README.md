# PLN inflation

Convert prices in Polish złoty (ISO 4217 code 'PLN') from one year to another.


## Usage

```
import inflation from 'pln-inflation';

const current = inflation({ year: 1995, amount: 1.23 });
console.log(`$1.23 in 1995 was worth $${current} in 2020`);
```

## Documentation

There is a single function exported by the library that has one required and one optional argument. It returns the converted price.

### `inflation(from, [to])`

The required `from` argument and the optional `to` argument are similar objects.

#### `from`

- `amount` is the nominal price
- `year` is a year between 1995 and 2020

#### `to` (optional)

- `year` is a year between 1995 and 2020 and is 2020 (the last full year of data) by default

## Data source

All data comes from the Central Statistical Office of Poland (GUS) and is therefore limited to years between 1950 and 2020. However due to redenomination of Polish złoty in 1995 this package is currently limited to years between 1995 and 2020.  

## Prior art and motivation

- I came across 'us-inflation' package (https://www.npmjs.com/package/us-inflation).
- I was inspired by the president of the National Bank of Poland and his statement that "inflation does not affect the wealth of Polish citizens" (I rephrased it a bit for the sake of clarity). 🔗https://youtu.be/njqEBOntE9I
