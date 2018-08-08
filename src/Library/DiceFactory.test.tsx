import DiceFactory from "./DiceFactory";

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

test('Should be able to correctly interpret an expression', () => {
    const factory = new DiceFactory('seed');
    const dice = factory.createFromExpression('3d100 + 4d8 + 2d6+1d4');

    expect(dice).toHaveLength(10);
    expect(dice.map(d => d.value).reduce((p, c) => p + c)).toEqual(240);

    expect(dice.filter(d => d.sides === 100)).toHaveLength(3);
    expect(dice.filter(d => d.sides === 8)).toHaveLength(4);
    expect(dice.filter(d => d.sides === 6)).toHaveLength(2);
    expect(dice.filter(d => d.sides === 4)).toHaveLength(1);
});