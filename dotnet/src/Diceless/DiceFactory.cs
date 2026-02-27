namespace Diceless;

public class DiceFactory
{
    private readonly IntGenerator _generator;

    public DiceFactory(string? seed = null)
    {
        var random = seed != null ? new Random(GetDeterministicSeed(seed)) : new Random();
        _generator = (min, max) => random.Next(min, max + 1);
    }

    public DiceFactory(IntGenerator generator)
    {
        _generator = generator;
    }

    public Die CreateSingle(int sides)
    {
        return new Die(sides, _generator);
    }

    public List<Die> CreateMultiple(int number, int sides)
    {
        var result = new List<Die>();

        for (var i = 0; i < number; i++)
        {
            result.Add(CreateSingle(sides));
        }

        return result;
    }

    public Pool CreatePool(IReadOnlyList<Die> dice, int constant)
    {
        return new Pool(dice, constant);
    }

    public Pool CreateFromExpression(string expression)
    {
        var converter = new Converter(this);
        return converter.ParseString(expression);
    }

    private static int GetDeterministicSeed(string seed)
    {
        unchecked
        {
            var hash = 5381;
            foreach (var c in seed)
            {
                hash = ((hash << 5) + hash) + c;
            }
            return hash;
        }
    }
}
