namespace Diceless.Tests;

public class DiceFactoryTests
{
    [Fact]
    public void ShouldBeAbleToCreateASingleDie()
    {
        var factory = new DiceFactory("seed");
        var die = factory.CreateSingle(8);

        Assert.True(die.Value >= 1 && die.Value <= 8);
        Assert.Equal(8, die.Sides);
    }

    [Fact]
    public void ShouldBeAbleToCreate4d6()
    {
        var factory = new DiceFactory("seed");
        var dice = factory.CreateMultiple(4, 6);

        Assert.Equal(4, dice.Count);

        foreach (var d in dice)
        {
            Assert.Equal(6, d.Sides);
        }
    }

    [Fact]
    public void ShouldBeAbleToCorrectlyInterpret3d100Plus4d8Plus2d6Plus1d4()
    {
        var factory = new DiceFactory("seed");
        var pool = factory.CreateFromExpression("3d100 + 4d8 + 2d6+1d4");

        Assert.Equal(10, pool.Dice.Count);

        Assert.Equal(3, pool.Dice.Count(d => d.Sides == 100));
        Assert.Equal(4, pool.Dice.Count(d => d.Sides == 8));
        Assert.Equal(2, pool.Dice.Count(d => d.Sides == 6));
        Assert.Equal(1, pool.Dice.Count(d => d.Sides == 4));
    }

    [Fact]
    public void ShouldBeAbleToCorrectlyInterpretExpressionWithConstants()
    {
        var factory = new DiceFactory("seed");
        var pool = factory.CreateFromExpression("2d6+5+3d8 - 2 + 4 + 1d6 + 3");

        Assert.Equal(6, pool.Dice.Count);
        Assert.Equal(10, pool.Constant);
    }

    [Fact]
    public void ShouldBeAbleToCorrectlyInterpret4d4Plus3d6Minus2Plus7()
    {
        var factory = new DiceFactory("seed");
        var pool = factory.CreateFromExpression("4d4+3d6 -2 + 7");

        Assert.Equal(5, pool.Constant);
        Assert.Equal(7, pool.Dice.Count);

        var stats = new PoolStats(pool);
        var sumOfDice = pool.Dice.Sum(d => d.Value);

        Assert.Equal(sumOfDice + 5, stats.Aggregates.Sum);
        Assert.Equal((double)sumOfDice / 7, stats.Aggregates.Average);
    }

    [Fact]
    public void CreatePool_ShouldCreatePoolWithGivenDiceAndConstant()
    {
        var factory = new DiceFactory("seed");
        var dice = factory.CreateMultiple(2, 6);
        var pool = factory.CreatePool(dice, 3);

        Assert.Equal(2, pool.Dice.Count);
        Assert.Equal(3, pool.Constant);
    }

    [Fact]
    public void DeterministicSeed_ProducesSameResults()
    {
        var factory1 = new DiceFactory("test_seed");
        var factory2 = new DiceFactory("test_seed");

        var die1 = factory1.CreateSingle(6);
        var die2 = factory2.CreateSingle(6);

        Assert.Equal(die1.Value, die2.Value);
    }

    [Fact]
    public void CustomGenerator_IsUsed()
    {
        IntGenerator generator = (min, max) => 42;
        var factory = new DiceFactory(generator);
        var die = factory.CreateSingle(100);
        Assert.Equal(42, die.Value);
    }
}
