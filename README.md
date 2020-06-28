# node-uci-engine

Library for automating analysis with UCI-compatible chess engines

[![Build Status](https://travis-ci.org/lubert/node-uci-engine.svg?branch=master)](https://travis-ci.org/lubert/node-uci-engine)

## Installation

```bash
npm install @lubert/node-uci-engine
```

## Usage

```javascript
const { Engine, Position, SearchConfig } = require('@lubert/node-uci-engine');

const engine = new Engine('/path/to/your/engine');
const position = new Position("r1bqkb1r/5ppp/p2ppn2/1pn5/3NP3/1BN5/PPP2PPP/R1BQR1K1 w kq - 4 10");
const config = new SearchConfig({ depth: 15 });
engine.analyzePosition(
    position,
    config,
    (result) => {
        const bestMove = result.getMove();
        const analysis = result.getAnalysis();
    }
);

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
