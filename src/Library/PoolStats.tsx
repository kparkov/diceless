import Distribution from "./Distribution";
import Pool from "./Pool";

interface IAggregates {
    average: number;
    complexity: number;
    expected: number;
    length: number;
    maximum: number;
    median: number;
    minimum: number;
    sum: number;
    values: number[];
    sides: number[];
    highestPossible: number;
    lowestPossible: number;
}

export default class PoolStats {
    private _pool: Pool;

    private _aggregates : IAggregates | null = null;
    private _distribution : Distribution | null = null;
    
    constructor(pool: Pool) {
        this._pool = pool;
    }

    public get aggregates() : IAggregates {
        if (this._aggregates === null) {
            this._aggregates = this.createAggregates();
        }

        return this._aggregates;
    }

    public get distribution(): Distribution {
        if (this._distribution === null) {
            this._distribution = new Distribution(this._pool.dice.map(x => x.sides), this._pool.constant);
        }

        return this._distribution;
    }

    private createAggregates() : IAggregates {
        const constant = this._pool.constant;

        let average = 0;
        const values = this._pool.dice.map(d => d.value).slice().sort((a, b) => a - b);
        const sides = this._pool.dice.map(d => d.sides).slice().sort();
        const length = values.length;
        let sum = constant;
        let median = constant;
        let maximum = 0;
        let minimum = 0;
        let expected = constant;
        let highestPossible = constant;
        let lowestPossible = constant;
        let complexity = 0;
        
        
        if (length > 0) {
            const sumOfDice = values.reduce((p, c) => p + c);
            sum += sumOfDice;
            average += sumOfDice / length;
            median += length % 2 === 0 ? ((values[(length / 2) - 1] + values[length / 2])) / 2 : values[Math.floor(length / 2)];
            minimum += values[0];
            maximum += values[length - 1];
            highestPossible += sides.reduce((p, c) => p + c);
            lowestPossible += length;
            expected += sides.map(x => x + 1).reduce((p, c) => p + c) / 2;
            complexity += sides.reduce((p, c) => p * c);
        }

        return {
            average,
            complexity,
            expected,
            highestPossible,
            length,
            lowestPossible,
            maximum,
            median,
            minimum,
            sides,
            sum,
            values
        };
    }
}