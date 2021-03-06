import DiceFactory from "./DiceFactory";
import Die from "./Die";
import Pool from "./Pool";
import PoolStats from "./PoolStats";

test('Should calculate the correct aggregates for 4d6', () => {
    const factory = new DiceFactory('seed6');
    const pool : Pool = factory.createFromExpression('4d6');

    expect(pool.dice).toHaveLength(4);

    expect(pool.dice.map(d => d.value).reduce((p, c) => p + c)).toEqual(13);

    const stats = new PoolStats(pool);

    expect(stats.aggregates.values).toEqual([2, 2, 3, 6]);
    expect(stats.aggregates.sum).toEqual(13);
    expect(stats.aggregates.length).toEqual(4);
    expect(stats.aggregates.average).toEqual(3.25);
    expect(stats.aggregates.lowestPossible).toEqual(4);
    expect(stats.aggregates.highestPossible).toEqual(24);
});

test('Should calculate correct median', () => {
    function statsFrom(values: number[]): PoolStats {
        const pool = new Pool(values.map(v => new Die({ generator: (min: number, max: number) => v, sides: 100 })), 0);
        return new PoolStats(pool);
    }

    expect(statsFrom([2, 4]).aggregates.median).toEqual(3);
    expect(statsFrom([2, 5, 7]).aggregates.median).toEqual(5);
    expect(statsFrom([2, 4, 6, 8]).aggregates.median).toEqual(5);
    expect(statsFrom([2, 4, 8, 15, 22, 23]).aggregates.median).toEqual(11.5);
});

test('Should calculate correct complexity', () => {
    const factory = new DiceFactory('seed');
    const pool : Pool = factory.createFromExpression('3d8 + 4d6');
    const stats = new PoolStats(pool);

    expect(stats.aggregates.complexity).toEqual(663552);
});