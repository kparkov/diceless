namespace Diceless.Tests;

public class ConverterTests
{
    [Fact]
    public void SerializeDice_ShouldFormatCorrectly()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die>
        {
            new(6, generator),
            new(6, generator),
            new(8, generator),
        };

        var converter = new Converter();
        var result = converter.SerializeDice(dice);

        Assert.Equal("1d8 + 2d6", result);
    }

    [Fact]
    public void SerializePool_WithPositiveConstant()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die> { new(6, generator), new(6, generator) };
        var pool = new Pool(dice, 3);

        var converter = new Converter();
        var result = converter.SerializePool(pool);

        Assert.Equal("2d6 + 3", result);
    }

    [Fact]
    public void SerializePool_WithNegativeConstant()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die> { new(6, generator), new(6, generator) };
        var pool = new Pool(dice, -2);

        var converter = new Converter();
        var result = converter.SerializePool(pool);

        Assert.Equal("2d6 - 2", result);
    }

    [Fact]
    public void SerializePool_WithNoConstant()
    {
        IntGenerator generator = (min, max) => 1;
        var dice = new List<Die> { new(6, generator), new(6, generator) };
        var pool = new Pool(dice, 0);

        var converter = new Converter();
        var result = converter.SerializePool(pool);

        Assert.Equal("2d6", result);
    }

    [Fact]
    public void ParseString_SimpleExpression()
    {
        var factory = new DiceFactory("seed");
        var converter = new Converter(factory);
        var pool = converter.ParseString("2d6");

        Assert.Equal(2, pool.Dice.Count);
        Assert.All(pool.Dice, d => Assert.Equal(6, d.Sides));
        Assert.Equal(0, pool.Constant);
    }

    [Fact]
    public void ParseString_WithConstant()
    {
        var factory = new DiceFactory("seed");
        var converter = new Converter(factory);
        var pool = converter.ParseString("2d6+3");

        Assert.Equal(2, pool.Dice.Count);
        Assert.Equal(3, pool.Constant);
    }

    [Fact]
    public void ParseString_WithNegativeConstant()
    {
        var factory = new DiceFactory("seed");
        var converter = new Converter(factory);
        var pool = converter.ParseString("2d6-3");

        Assert.Equal(2, pool.Dice.Count);
        Assert.Equal(-3, pool.Constant);
    }

    [Fact]
    public void ParseString_ComplexExpression()
    {
        var factory = new DiceFactory("seed");
        var converter = new Converter(factory);
        var pool = converter.ParseString("2d6+3d8+5-2");

        Assert.Equal(5, pool.Dice.Count);
        Assert.Equal(2, pool.Dice.Count(d => d.Sides == 6));
        Assert.Equal(3, pool.Dice.Count(d => d.Sides == 8));
        Assert.Equal(3, pool.Constant);
    }

    [Fact]
    public void RoundTrip_ParseAndSerialize()
    {
        var factory = new DiceFactory("seed");
        var pool = factory.CreateFromExpression("3d8 + 2d6 + 5");

        // Expression should contain all parts
        Assert.Contains("3d8", pool.Expression);
        Assert.Contains("2d6", pool.Expression);
        Assert.Contains("5", pool.Expression);
    }
}
