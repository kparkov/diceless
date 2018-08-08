import { Die } from "./Die";

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
    private _dice: Die[];

    private _aggregates : IAggregates | null = null;
    
    constructor(dice: Die[]) {
        this._dice = dice;
        this.createAggregates();
    }

    public get aggregates() : IAggregates {
        if (this._aggregates === null) {
            this._aggregates = this.createAggregates();
        }

        return this._aggregates;
    }

    private createAggregates() : IAggregates {
        let average = 0;
        const values = this._dice.map(d => d.value).slice().sort((a, b) => a - b);
        const sides = this._dice.map(d => d.sides).slice().sort();
        const length = values.length;
        let sum = 0;
        let median = 0;
        let maximum = 0;
        let minimum = 0;
        let expected = 0;
        let highestPossible = 0;
        let lowestPossible = 0;
        let complexity = 0;
        
        
        if (length > 0) {
            sum = values.reduce((p, c) => p + c);
            average = Math.round((sum / length) * 100) / 100;
            median = length % 2 === 0 ? ((values[(length / 2) - 1] + values[length / 2])) / 2 : values[Math.floor(length / 2)];
            minimum = values[0];
            maximum = values[length - 1];
            highestPossible = sides.reduce((p, c) => p + c);
            lowestPossible = length;
            expected = sides.map(x => x + 1).reduce((p, c) => p + c) / 2;
            complexity = sides.reduce((p, c) => p * c);
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