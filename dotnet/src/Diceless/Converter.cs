using System.Text.RegularExpressions;

namespace Diceless;

public class Converter
{
    private readonly DiceFactory? _factory;

    public Converter(DiceFactory? factory = null)
    {
        _factory = factory;
    }

    public Pool ParseString(string representation)
    {
        var factory = _factory ?? new DiceFactory();

        var cleaned = Regex.Replace(representation, @"\s", "");
        var withSeparators = Regex.Replace(cleaned, @"([+\-])", "|$1");
        var units = withSeparators.Split('|', StringSplitOptions.RemoveEmptyEntries);

        var dice = new List<Die>();
        var constant = 0;

        foreach (var unit in units)
        {
            if (unit.Contains('d', StringComparison.OrdinalIgnoreCase))
            {
                var dexpression = Regex.IsMatch(unit, @"^[+\-]") ? unit[1..] : unit;
                var parts = Regex.Split(dexpression, @"[dD]");
                var count = int.Parse(parts[0]);
                var sides = int.Parse(parts[1]);

                dice.AddRange(factory.CreateMultiple(count, sides));
            }
            else
            {
                var sign = unit[0] == '+' ? 1 : -1;
                var value = int.Parse(unit[1..]);
                constant += sign * value;
            }
        }

        return new Pool(dice, constant);
    }

    public string SerializeDice(IReadOnlyList<Die> dice)
    {
        var distribution = new Dictionary<int, int>();

        foreach (var die in dice)
        {
            if (distribution.ContainsKey(die.Sides))
                distribution[die.Sides]++;
            else
                distribution[die.Sides] = 1;
        }

        var strings = distribution
            .OrderByDescending(kvp => kvp.Key)
            .Select(kvp => $"{kvp.Value}d{kvp.Key}");

        return string.Join(" + ", strings);
    }

    public string SerializePool(Pool pool)
    {
        var result = SerializeDice(pool.Dice);

        if (pool.Constant != 0)
        {
            result += pool.Constant < 0 ? " - " : " + ";
            result += Math.Abs(pool.Constant);
        }

        return result;
    }
}
