namespace Diceless.Tests;

public class IdGeneratorTests
{
    [Fact]
    public void Id_ShouldReturnNonEmptyString()
    {
        var id = IdGenerator.Id();
        Assert.False(string.IsNullOrEmpty(id));
    }

    [Fact]
    public void Id_ShouldReturnUniqueValues()
    {
        var id1 = IdGenerator.Id();
        var id2 = IdGenerator.Id();
        Assert.NotEqual(id1, id2);
    }

    [Fact]
    public void Id_ShouldReturnValidGuidFormat()
    {
        var id = IdGenerator.Id();
        Assert.True(Guid.TryParse(id, out _));
    }
}
