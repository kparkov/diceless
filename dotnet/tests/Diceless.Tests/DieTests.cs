namespace Diceless.Tests;

public class DieTests
{
    private static Die CreateSeededDie(int sides = 6, int? initialValue = null)
    {
        var factory = new DiceFactory("seed");
        if (initialValue.HasValue)
        {
            return new Die(sides, (min, max) => initialValue.Value);
        }
        return factory.CreateSingle(sides);
    }

    [Fact]
    public void Die_ShouldHaveValueAfterCreation()
    {
        var die = CreateSeededDie();
        Assert.True(die.Value >= 1 && die.Value <= 6);
    }

    [Fact]
    public void Die_ShouldHaveCorrectSides()
    {
        var die = CreateSeededDie(8);
        Assert.Equal(8, die.Sides);
    }

    [Fact]
    public void Die_CanBeSetToInitialValue()
    {
        var die = new Die(6, (min, max) => 1, initialValue: 4);
        Assert.Equal(4, die.Value);
    }

    [Fact]
    public void Die_RollShouldChangeValue()
    {
        var callCount = 0;
        var values = new[] { 3, 5 };
        IntGenerator generator = (min, max) => values[callCount++];

        var die = new Die(6, generator);
        Assert.Equal(3, die.Value);

        die.Roll();
        Assert.Equal(5, die.Value);
    }

    [Fact]
    public void Die_ShouldHaveUniqueId()
    {
        var die1 = CreateSeededDie();
        var die2 = CreateSeededDie();
        Assert.NotEqual(die1.Id, die2.Id);
    }

    [Fact]
    public void Die_RollReturnsValue()
    {
        IntGenerator generator = (min, max) => 4;
        var die = new Die(6, generator);
        var result = die.Roll();
        Assert.Equal(die.Value, result);
    }

    [Fact]
    public void Die_DefaultSidesIs6WhenZero()
    {
        IntGenerator generator = (min, max) => 3;
        var die = new Die(0, generator);
        Assert.Equal(6, die.Sides);
    }
}
