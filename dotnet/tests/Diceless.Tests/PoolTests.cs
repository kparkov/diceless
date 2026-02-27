namespace Diceless.Tests;

public class PoolTests
{
    [Fact]
    public void Pool_ShouldHaveUniqueId()
    {
        IntGenerator generator = (min, max) => 1;
        var dice1 = new List<Die> { new(6, generator) };
        var dice2 = new List<Die> { new(6, generator) };

        var pool1 = new Pool(dice1, 0);
        var pool2 = new Pool(dice2, 0);

        Assert.NotEqual(pool1.Id, pool2.Id);
    }

    [Fact]
    public void Pool_ShouldHaveCorrectDice()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die>
        {
            new(6, generator),
            new(8, generator),
        };

        var pool = new Pool(dice, 0);

        Assert.Equal(2, pool.Dice.Count);
    }

    [Fact]
    public void Pool_ShouldHaveCorrectConstant()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die> { new(6, generator) };

        var pool = new Pool(dice, 5);

        Assert.Equal(5, pool.Constant);
    }

    [Fact]
    public void Pool_ExpressionShouldBeSerialized()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die>
        {
            new(6, generator),
            new(6, generator),
        };

        var pool = new Pool(dice, 3);

        Assert.Contains("2d6", pool.Expression);
        Assert.Contains("3", pool.Expression);
    }

    [Fact]
    public void Pool_IsEmpty_ReturnsTrueWhenDiceExist()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die> { new(6, generator) };
        var pool = new Pool(dice, 0);

        Assert.True(pool.IsEmpty());
    }

    [Fact]
    public void Pool_IsEmpty_ReturnsFalseWhenNoDice()
    {
        var pool = new Pool(new List<Die>(), 0);

        Assert.False(pool.IsEmpty());
    }
}
