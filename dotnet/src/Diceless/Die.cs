namespace Diceless;

public class Die
{
    private readonly IntGenerator _generator;
    private readonly int _sides;
    private int _value;

    public Die(int sides, IntGenerator generator, int? initialValue = null)
    {
        Id = IdGenerator.Id();
        _generator = generator;
        _sides = sides > 0 ? sides : 6;

        if (initialValue.HasValue)
        {
            _value = initialValue.Value;
        }
        else
        {
            Roll();
        }
    }

    public string Id { get; }

    public int Value => _value;

    public int Sides => _sides;

    public int Roll()
    {
        _value = _generator(1, _sides);
        return _value;
    }
}
