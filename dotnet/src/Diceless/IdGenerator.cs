namespace Diceless;

public static class IdGenerator
{
    public static string Id() => Guid.NewGuid().ToString();
}
