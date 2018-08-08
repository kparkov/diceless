import { Chance } from 'chance';
import { Die, IDieArguments } from "./Die";
import { IntGenerator } from './IntGenerator';

function createDieArgs() : IDieArguments {
    const chance = new Chance.Chance("seed");
    const generator : IntGenerator = (min: number, max: number) => chance.integer({ min, max });
    const sides : number = 6;

    return { generator, sides };
}

test('Seeded 1d6 should have first roll of 2', () => {
    const die = new Die(createDieArgs());
    expect(die.value).toEqual(2);
});

test('Can be set to initial value', () => {
    let die = new Die(createDieArgs());
    expect(die.value).toEqual(2);

    die = new Die({ ...createDieArgs(), initialValue: 4 });
    expect(die.value).toEqual(4);
});