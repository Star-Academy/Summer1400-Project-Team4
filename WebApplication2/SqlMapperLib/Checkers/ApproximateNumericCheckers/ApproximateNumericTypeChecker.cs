using System.Text.RegularExpressions;

namespace SqlMapper.Checkers.ApproximateNumericCheckers
{
    public static class ApproximateNumericTypeChecker
    {
        public static bool IsApproximate(string data)
        {
            return Regex.IsMatch(data, "^\\d+\\.\\d+$");
        }
    }
}