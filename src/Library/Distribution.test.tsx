import Distribution from "./Distribution";

test('Should correctly assess 2d6', () => {
    const distribution = new Distribution([6, 6], 0);
    expect(distribution.permutationCounts()).toHaveLength(11);
    expect(distribution.permutationCountsOf(7).permutations).toEqual(6);
    expect(distribution.permutationCountsOf(2).permutations).toEqual(1);
});

test('Should correctly assess 2d6 + 1d8', () => {
    const distribution = new Distribution([6, 6, 8], 0);
    expect(distribution.permutationCounts()).toHaveLength(18);
    expect(distribution.permutationCountsOf(11).permutations).toEqual(32);
    expect(distribution.permutationCountsOf(12).permutations).toEqual(32);
    expect(distribution.permutationCountsOf(20).permutations).toEqual(1);
    expect(distribution.percentage(distribution.permutationCountsOf(12).permutations)).toEqual(0.1111111111111111);
});

test('Should correctly assess 2d6 + 1d8 + 4', () => {
    const distribution = new Distribution([6, 6, 8], 3);
    expect(distribution.permutationCounts()).toHaveLength(18);
    expect(distribution.permutationCountsOf(14).permutations).toEqual(32);
    expect(distribution.permutationCountsOf(15).permutations).toEqual(32);
    expect(distribution.permutationCountsOf(23).permutations).toEqual(1);
    expect(distribution.percentage(distribution.permutationCountsOf(15).permutations)).toEqual(0.1111111111111111);
});