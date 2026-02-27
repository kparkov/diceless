namespace Diceless.Tests;

public class PoolStatsTests
{
    private static Pool CreatePoolWithValues(int[] values, int constant = 0, int sides = 100)
    {
        var dice = values.Select(v => new Die(sides, (min, max) => v)).ToList();
        return new Pool(dice, constant);
    }

    [Fact]
    public void ShouldCalculateCorrectAggregates()
    {
        IntGenerator generator = (min, max) => min;
        var factory = new DiceFactory(generator);
        var pool = factory.CreateFromExpression("4d6");

        Assert.Equal(4, pool.Dice.Count);

        var stats = new PoolStats(pool);

        // All dice rolled min (1), so values should be [1,1,1,1]
        Assert.Equal(4, stats.Aggregates.Sum);
        Assert.Equal(4, stats.Aggregates.Length);
        Assert.Equal(1.0, stats.Aggregates.Average);
        Assert.Equal(4, stats.Aggregates.LowestPossible);
        Assert.Equal(24, stats.Aggregates.HighestPossible);
    }

    [Fact]
    public void ShouldCalculateCorrectMedian_EvenCount()
    {
        var stats = new PoolStats(CreatePoolWithValues([2, 4]));
        Assert.Equal(3.0, stats.Aggregates.Median);
    }

    [Fact]
    public void ShouldCalculateCorrectMedian_OddCount()
    {
        var stats = new PoolStats(CreatePoolWithValues([2, 5, 7]));
        Assert.Equal(5.0, stats.Aggregates.Median);
    }

    [Fact]
    public void ShouldCalculateCorrectMedian_EvenCount_Four()
    {
        var stats = new PoolStats(CreatePoolWithValues([2, 4, 6, 8]));
        Assert.Equal(5.0, stats.Aggregates.Median);
    }

    [Fact]
    public void ShouldCalculateCorrectMedian_EvenCount_Six()
    {
        var stats = new PoolStats(CreatePoolWithValues([2, 4, 8, 15, 22, 23]));
        Assert.Equal(11.5, stats.Aggregates.Median);
    }

    [Fact]
    public void ShouldCalculateCorrectComplexity()
    {
        IntGenerator generator = (min, max) => min;
        var factory = new DiceFactory(generator);
        var pool = factory.CreateFromExpression("3d8 + 4d6");
        var stats = new PoolStats(pool);

        Assert.Equal(663552, stats.Aggregates.Complexity);
    }

    [Fact]
    public void ValuesAreOrderedAscending()
    {
        var stats = new PoolStats(CreatePoolWithValues([6, 2, 3, 2]));
        Assert.Equal(new[] { 2, 2, 3, 6 }, stats.Aggregates.Values);
    }

    [Fact]
    public void SumIncludesConstant()
    {
        var stats = new PoolStats(CreatePoolWithValues([3, 4], constant: 5));
        Assert.Equal(12, stats.Aggregates.Sum);
    }

    [Fact]
    public void EmptyPool_ShouldReturnZeroAggregates()
    {
        var pool = new Pool(new List<Die>(), 0);
        var stats = new PoolStats(pool);

        Assert.Equal(0, stats.Aggregates.Sum);
        Assert.Equal(0, stats.Aggregates.Length);
        Assert.Equal(0, stats.Aggregates.Average);
        Assert.Equal(0, stats.Aggregates.HighestPossible);
        Assert.Equal(0, stats.Aggregates.LowestPossible);
        Assert.Equal(0, stats.Aggregates.Complexity);
    }

    [Fact]
    public void Distribution_ShouldBeAccessible()
    {
        var factory = new DiceFactory("seed");
        var pool = factory.CreateFromExpression("2d6");
        var stats = new PoolStats(pool);

        Assert.NotNull(stats.Distribution);
        Assert.Equal(11, stats.Distribution.PermutationCounts().Length);
    }

    [Fact]
    public void MinimumAndMaximum_ShouldBeCorrect()
    {
        var stats = new PoolStats(CreatePoolWithValues([1, 3, 5, 2]));
        Assert.Equal(1, stats.Aggregates.Minimum);
        Assert.Equal(5, stats.Aggregates.Maximum);
    }
}
