using System.Security.Cryptography;

namespace EntropyLab.Services;

public class RandomService
{
    private static readonly HttpClient httpClient = new();

    public async Task<int> GenerateTrueNumber(int min, int max)
    {
        if (min < -1_000_000_000 || max > 1_000_000_000 || min > max)
            throw new ArgumentOutOfRangeException(nameof(min));

        string url = $"https://www.random.org/integers/?num=1&min={min}&max={max}&col=1&base=10&format=plain&rnd=new";

        string response = await httpClient.GetStringAsync(url);

        return int.Parse(response.Trim());
    }

    public int GenerateNumber(int min, int max)
    {
        if (min > max || max == int.MaxValue)
            throw new ArgumentOutOfRangeException(nameof(max));

        return RandomNumberGenerator.GetInt32(min, max + 1);
    }

}