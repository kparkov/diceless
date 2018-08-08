import { Chance } from 'chance';
import { Converter } from './Converter';
import { Die } from './Die';
import { IntGenerator } from './IntGenerator';

export default class DiceFactory {
    private _generator: IntGenerator;

    constructor(seed?: string) {
        const chance = seed ? new Chance.Chance(seed) : new Chance.Chance();
        this._generator = (min: number, max: number) => chance.integer({ min: 1, max });
    }

    public createSingle(sides: number): Die {
        return new Die({ sides, generator: this._generator });
    }

    public createMultiple(number: number, sides: number): Die[] {
        const result : Die[] = [];

        for (let i = 0; i < number; i++) {
            result.push(this.createSingle(sides));
        }

        return result;
    }

    public createFromExpression(expression: string): Die[] {
        const converter = new Converter(this);
        return converter.parseString(expression);
    }
}