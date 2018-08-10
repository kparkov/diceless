import Distribution from "./Distribution";

test('Should correctly assess 2d6', () => {
    const distribution = new Distribution([6, 6]);
    expect(distribution.combinationCounts()).toHaveLength(11);
    expect(distribution.combinationCountsOf(7)).toEqual(6);
    expect(distribution.combinationCountsOf(2)).toEqual(1);
});

test('Should correctly assess 2d6 + 1d8', () => {
    const distribution = new Distribution([6, 6, 8]);
    expect(distribution.combinationCounts()).toHaveLength(18);
    expect(distribution.combinationCountsOf(11)).toEqual(32);
    expect(distribution.combinationCountsOf(12)).toEqual(32);
    expect(distribution.combinationCountsOf(20)).toEqual(1);
    expect(distribution.percentage(distribution.combinationCountsOf(12).combinations)).toEqual(0.1111);
})