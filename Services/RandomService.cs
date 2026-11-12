using System.Security.Cryptography;

namespace EntropyLab.Services;

public class RandomService
{
    public int GenerateNumber()
    {
        return RandomNumberGenerator.GetInt32(1, 101);
    }
}