import { Chance } from 'chance';
import { Converter } from './Converter';
import Die from './Die';
import { IntGenerator } from './IntGenerator';
import Pool from './Pool';

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

    public createPool(dice: Die[], constant: number): Pool {
        return new Pool(dice, constant);
    }

    public createFromExpression(expression: string): Pool {
        const converter = new Converter(this);
        return converter.parseString(expression);
    }
}