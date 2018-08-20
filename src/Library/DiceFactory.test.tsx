import DiceFactory from "./DiceFactory";
import Pool from "./Pool";

test('Should be able to create a single die with 8 sides', () => {
    const factory = new DiceFactory('seed');
    const die = factory.createSingle(8);

    expect(die.value).toEqual(3);
    expect(die.sides).toEqual(8);
});

test('Should be able to create 4d6', () => {
    const factory = new DiceFactory('seed');
    const dice = factory.createMultiple(4, 6);

    expect(dice).toHaveLength(4);

    dice.forEach(d => {
        expect(d.sides).toEqual(6);
    });
});

test('Should be able to correctly interpret 3d100 + 4d8 + 2d6+1d4', () => {
    const factory = new DiceFactory('seed');
    const pool : Pool = factory.createFromExpression('3d100 + 4d8 + 2d6+1d4');

    expect(pool.dice).toHaveLength(10);
    expect(pool.dice.map(d => d.value).reduce((p, c) => p + c)).toEqual(240);

    expect(pool.dice.filter(d => d.sides === 100)).toHaveLength(3);
    expect(pool.dice.filter(d => d.sides === 8)).toHaveLength(4);
    expect(pool.dice.filter(d => d.sides === 6)).toHaveLength(2);
    expect(pool.dice.filter(d => d.sides === 4)).toHaveLength(1);
});

test('Should be able to correctly interpret 2d6+5+3d8 - 2 + 4 + 1d6 + 3', () => {
    const factory = new DiceFactory('seed');
    const pool : Pool = factory.createFromExpression('2d6+5+3d8 - 2 + 4 + 1d6 + 3');
    expect(pool.dice).toHaveLength(6);
    expect(pool.constant).toEqual(10);
});