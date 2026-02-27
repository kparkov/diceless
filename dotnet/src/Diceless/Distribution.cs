namespace Diceless;

public class Distribution
{
    private readonly int[] _sides;
    private readonly int _constant;
    private readonly PermutationCount[] _permutationCounts;
    private readonly double _permutations;

    public Distribution(int[] sides, int constant)
    {
        _sides = sides;
        _constant = constant;

        if (_sides.Length > 0)
        {
            _permutations = _sides.Aggregate(1.0, (p, c) => p * c);
            _permutationCounts = GenerateDistribution();
        }
        else
        {
            _permutations = 0;
            _permutationCounts = [];
        }
    }

    public PermutationCount PermutationCountsOf(int value)
    {
        var result = _permutationCounts.Where(x => x.Value == value).ToArray();

        if (result.Length == 1)
        {
            return result[0];
        }

        return new PermutationCount(value, 0, 0, 0);
    }

    public PermutationCount[] PermutationCounts()
    {
        return _permutationCounts.OrderBy(x => x.Value).ToArray();
    }

    public double Permutations() => _permutations;

    public double Percentage(double combinationCount)
    {
        return (double)combinationCount / _permutations;
    }

    private PermutationCount[] GenerateDistribution()
    {
        var baseDistribution = new PermutationCount[] { new(0, 1, 1, 1) };

        var cumulativeDistribution = baseDistribution;

        foreach (var sides in _sides)
        {
            var currentDistribution = new List<PermutationCount>();

            var cumulativeMinValue = cumulativeDistribution.Min(x => x.Value);
            var lengthOfCumulative = cumulativeDistribution.Length;
            double runningOccurrences = 0;

            for (var i = cumulativeMinValue + 1; i < cumulativeMinValue + lengthOfCumulative + sides; i++)
            {
                var firstValueFromCumulative = i - sides;
                var lastValueFromCumulative = i - 1;

                var sliceOfCumulativeDistribution = cumulativeDistribution
                    .Where(item => item.Value >= firstValueFromCumulative && item.Value <= lastValueFromCumulative);
                var sumOfSlice = sliceOfCumulativeDistribution.Sum(x => x.Permutations);

                currentDistribution.Add(new PermutationCount(
                    i,
                    sumOfSlice,
                    _permutations - runningOccurrences,
                    runningOccurrences + sumOfSlice));
                runningOccurrences += sumOfSlice;
            }

            cumulativeDistribution = currentDistribution.ToArray();
        }

        return cumulativeDistribution
            .Select(count => count with { Value = count.Value + _constant })
            .ToArray();
    }
}
