import DiceFactory from './DiceFactory';
import Die from './Die';
import Pool from './Pool';

export class Converter {

    private _factory: DiceFactory;

    constructor(factory?: DiceFactory) {
        this._factory = factory || new DiceFactory();
    }

    public parseString(representation: string): Pool {
        const units = representation
            .replace(/\s/, '')
            .replace(/[\+\-]/g, x => '|' + x)
            .split('|');

        let dice : Die[] = [];
        let constant : number = 0;

        for (const unit of units) {
            if (unit.toLowerCase().includes('d')) {
                const dexpression = /^[\+\-]/.test(unit) ? unit.substr(1) : unit;
                const splitted = dexpression.split(/[dD]/);
                const [count, sides] = [ parseInt(splitted[0], 10), parseInt(splitted[1], 10) ];

                dice = [ ...dice, ...this._factory.createMultiple(count, sides) ];                
            } else {
                const sign = unit.substr(0, 1) === '+' ? 1 : -1;
                const value = parseInt(unit.substr(1), 10);
                constant += sign * value;
            }
        }

        return new Pool(dice, constant);
    }

    public serializeDice(dice: Die[]) {
        const distribution : { [sides: number]: number } = {};
        
        for (const die of dice) {
            distribution[die.sides] = distribution[die.sides] ? distribution[die.sides] + 1 : 1;
        }

        const strings = Object.keys(distribution).map(key => `${distribution[key]}d${key}`);
        return strings.reverse().join(' + ');
    }

    public serializePool(pool: Pool) {
        let result = this.serializeDice(pool.dice);
        
        if (pool.constant !== 0) {
            result += pool.constant < 0 ? ' - ' : ' + ';
            result += Math.abs(pool.constant);
        }

        return result;
    }
}