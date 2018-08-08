import DiceFactory from './DiceFactory';
import { Die } from './Die';

export class Converter {

    private _factory: DiceFactory;

    constructor(factory?: DiceFactory) {
        this._factory = factory || new DiceFactory();
    }

    public parseString(representation: string): Die[] {
        const cleaned = representation.replace(/\s/, '');
        const pattern = /\d+[dD]\d+/g;
        const matches = cleaned.match(pattern);
        let result: Die[] = [];
        
        if (matches) {
            for (const match of matches) {
                const splitted = match.split(/[dD]/);
                const [count, sides] = [ parseInt(splitted[0], 10), parseInt(splitted[1], 10) ];

                result = [ ...result, ...this._factory.createMultiple(count, sides) ];
            }
        }

        return result;
    }

    public serialize(pool: Die[]) {
        const distribution : { [sides: number]: number } = {};
        
        for (const die of pool) {
            distribution[die.sides] = distribution[die.sides] ? distribution[die.sides] + 1 : 1;
        }

        const strings = Object.keys(distribution).map(key => `${distribution[key]}d${key}`);
        return strings.reverse().join(' + ');
    }
}