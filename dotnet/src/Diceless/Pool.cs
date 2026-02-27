namespace Diceless;

public class Pool
{
    public Pool(IReadOnlyList<Die> dice, int constant)
    {
        Id = IdGenerator.Id();
        Dice = dice;
        Constant = constant;

        var converter = new Converter();
        Expression = converter.SerializePool(this);
    }

    public string Id { get; }

    public IReadOnlyList<Die> Dice { get; }

    public string Expression { get; }

    public int Constant { get; }

    public bool IsEmpty() => Dice is { Count: > 0 };
}
