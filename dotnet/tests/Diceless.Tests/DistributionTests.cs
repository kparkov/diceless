namespace Diceless.Tests;

public class DistributionTests
{
    [Fact]
    public void ShouldCorrectlyAssess2d6()
    {
        var distribution = new Distribution([6, 6], 0);
        Assert.Equal(11, distribution.PermutationCounts().Length);
        Assert.Equal(6, distribution.PermutationCountsOf(7).Permutations);
        Assert.Equal(1, distribution.PermutationCountsOf(2).Permutations);
    }

    [Fact]
    public void ShouldCorrectlyAssess2d6Plus1d8()
    {
        var distribution = new Distribution([6, 6, 8], 0);
        Assert.Equal(18, distribution.PermutationCounts().Length);
        Assert.Equal(32, distribution.PermutationCountsOf(11).Permutations);
        Assert.Equal(32, distribution.PermutationCountsOf(12).Permutations);
        Assert.Equal(1, distribution.PermutationCountsOf(20).Permutations);
        Assert.Equal(0.1111111111111111, distribution.Percentage(distribution.PermutationCountsOf(12).Permutations), 10);
    }

    [Fact]
    public void ShouldCorrectlyAssess2d6Plus1d8WithConstant()
    {
        var distribution = new Distribution([6, 6, 8], 3);
        Assert.Equal(18, distribution.PermutationCounts().Length);
        Assert.Equal(32, distribution.PermutationCountsOf(14).Permutations);
        Assert.Equal(32, distribution.PermutationCountsOf(15).Permutations);
        Assert.Equal(1, distribution.PermutationCountsOf(23).Permutations);
        Assert.Equal(0.1111111111111111, distribution.Percentage(distribution.PermutationCountsOf(15).Permutations), 10);
    }

    [Fact]
    public void ProbabilityOfVeryUnlikelyShouldNeverBeRoundedTo100()
    {
        var sides = new int[40];
        for (var i = 0; i < 40; i++)
        {
            sides[i] = 6;
        }

        var distribution = new Distribution(sides, 0);

        Assert.True(distribution.Percentage(distribution.PermutationCountsOf(70).AtLeast) < 1);
    }

    [Fact]
    public void EmptyDistribution_ShouldReturnEmpty()
    {
        var distribution = new Distribution([], 0);
        Assert.Empty(distribution.PermutationCounts());
        Assert.Equal(0, distribution.Permutations());
    }

    [Fact]
    public void PermutationCountsOf_NonExistentValue_ReturnsZero()
    {
        var distribution = new Distribution([6, 6], 0);
        var result = distribution.PermutationCountsOf(999);
        Assert.Equal(999, result.Value);
        Assert.Equal(0, result.Permutations);
        Assert.Equal(0, result.AtLeast);
        Assert.Equal(0, result.AtMost);
    }

    [Fact]
    public void PermutationCounts_ShouldBeSortedByValue()
    {
        var distribution = new Distribution([6, 6], 0);
        var counts = distribution.PermutationCounts();

        for (var i = 1; i < counts.Length; i++)
        {
            Assert.True(counts[i].Value > counts[i - 1].Value);
        }
    }

    [Fact]
    public void Permutations_ShouldReturnTotalPermutations()
    {
        var distribution = new Distribution([6, 6], 0);
        Assert.Equal(36, distribution.Permutations());
    }

    [Fact]
    public void Permutations_3d6ShouldBe216()
    {
        var distribution = new Distribution([6, 6, 6], 0);
        Assert.Equal(216, distribution.Permutations());
    }
}
