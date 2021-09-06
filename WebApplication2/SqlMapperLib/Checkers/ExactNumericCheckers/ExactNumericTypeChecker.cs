using System.Text.RegularExpressions;

namespace SqlMapper.Checkers.ExactNumericCheckers
{
    public static class ExactNumericTypeChecker
    {
        public static bool IsExact(string data)
        {
            return Regex.IsMatch(data, "^-?\\d+$");
        }
    }
}