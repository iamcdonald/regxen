# Reg(X)en
Generate random strings that match a given regular expression.

## Install
```
npm install regxen
```
----
## Use
```
import RegXen from "regxen";

const rgxn = new RegXen(/(?<emoji>[\u{1F919}\u{1F91A}\u{1F91E}])(he[yi]l+(o|O|ö){1,2})\k<emoji>/v)
rgxn.generate(); // -> '🤞heillllllllöO🤞'
rgxn.generate(); // -> '🤞heylllllöö🤞'
rgxn.generate(); // -> '🤚heilllllllöO🤚'
rgxn.generate(); // -> '🤙heilllllö🤙'
```
----
### Repeatable sequences
The underlying random number generator can be be seeded allowing for reliably repatable sequences.
```
const rgxn = new RegXen(/\p{Emoji/v);
rgxn.setSeed("🍀");
rgxn.generate() // -> '🕹'
rgxn.generate() // -> '🧃'
rgxn.generate() // -> '🥹'
rgxn.setSeed("🍀");
rgxn.generate() // -> '🕹'
rgxn.generate() // -> '🧃'
rgxn.generate() // -> '🥹'

```
