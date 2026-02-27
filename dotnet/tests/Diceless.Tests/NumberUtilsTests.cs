namespace Diceless.Tests;

public class NumberUtilsTests
{
    [Fact]
    public void NumberString_ShouldFormatNumber()
    {
        var result = NumberUtils.NumberString(10.645378);
        Assert.Equal("10,65", result);
    }

    [Fact]
    public void NumberString_ShouldFormatWithDanishLocale()
    {
        var result = NumberUtils.NumberString(10.645378, "da-DK");
        Assert.Equal("10,65", result);
    }

    [Fact]
    public void Percentage_ShouldMultiplyBy100()
    {
        Assert.Equal(16.7895, NumberUtils.Percentage(0.167895));
    }

    [Fact]
    public void PercentageString_ShouldFormatCorrectly()
    {
        var result = NumberUtils.PercentageString(0.4578123);
        Assert.Equal("45,78%", result);
    }

    [Fact]
    public void NumberString_WholeNumber_NoTrailingZeros()
    {
        var result = NumberUtils.NumberString(10.0);
        Assert.Equal("10", result);
    }

    [Fact]
    public void Percentage_Zero_ReturnsZero()
    {
        Assert.Equal(0.0, NumberUtils.Percentage(0));
    }

    [Fact]
    public void Percentage_One_Returns100()
    {
        Assert.Equal(100.0, NumberUtils.Percentage(1.0));
    }
}
