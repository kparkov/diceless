namespace Diceless;

public class PoolStats
{
    private readonly Pool _pool;
    private Aggregates? _aggregates;
    private Distribution? _distribution;

    public PoolStats(Pool pool)
    {
        _pool = pool;
    }

    public Aggregates Aggregates => _aggregates ??= CreateAggregates();

    public Distribution Distribution =>
        _distribution ??= new Distribution(
            _pool.Dice.Select(x => x.Sides).ToArray(),
            _pool.Constant);

    private Aggregates CreateAggregates()
    {
        var constant = _pool.Constant;
        var values = _pool.Dice.Select(d => d.Value).OrderBy(v => v).ToArray();
        var sides = _pool.Dice.Select(d => d.Sides).OrderBy(s => s).ToArray();
        var length = values.Length;

        double average = 0;
        var sum = constant;
        double median = constant;
        var maximum = 0;
        var minimum = 0;
        double expected = constant;
        var highestPossible = constant;
        var lowestPossible = constant;
        long complexity = 0;

        if (length > 0)
        {
            var sumOfDice = values.Sum();
            sum += sumOfDice;
            average += (double)sumOfDice / length;
            median += length % 2 == 0
                ? (values[(length / 2) - 1] + values[length / 2]) / 2.0
                : values[length / 2];
            minimum += values[0];
            maximum += values[^1];
            highestPossible += sides.Sum();
            lowestPossible += length;
            expected += sides.Select(x => x + 1).Sum() / 2.0;
            complexity += sides.Aggregate(1L, (p, c) => p * c);
        }

        return new Aggregates(
            Average: average,
            Complexity: complexity,
            Expected: expected,
            HighestPossible: highestPossible,
            Length: length,
            LowestPossible: lowestPossible,
            Maximum: maximum,
            Median: median,
            Minimum: minimum,
            Sides: sides,
            Sum: sum,
            Values: values);
    }
}

public record Aggregates(
    double Average,
    long Complexity,
    double Expected,
    int HighestPossible,
    int Length,
    int LowestPossible,
    int Maximum,
    double Median,
    int Minimum,
    int[] Sides,
    int Sum,
    int[] Values);
