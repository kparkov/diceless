using System.Globalization;

namespace Diceless;

public static class NumberUtils
{
    public static string NumberString(double x, string? locale = null, int maxDigits = 2)
    {
        var culture = locale != null
            ? CultureInfo.GetCultureInfo(locale)
            : CultureInfo.GetCultureInfo("da-DK");
        return x.ToString($"N{maxDigits}", culture).TrimEnd('0').TrimEnd(culture.NumberFormat.NumberDecimalSeparator[0]);
    }

    public static double Percentage(double fraction) => fraction * 100;

    public static string PercentageString(double fraction, string? locale = null, int maxDigits = 2)
    {
        return NumberString(fraction * 100, locale, maxDigits) + "%";
    }
}
