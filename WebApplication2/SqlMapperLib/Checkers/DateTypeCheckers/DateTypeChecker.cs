using System.Text.RegularExpressions;

namespace SqlMapper.Checkers.DateTypeCheckers
{
    public static class DateTypeChecker
    {
        public static bool IsDate(string data)
        {
            var isMatch = false;

            if (Regex.IsMatch(data, "^\\d{2}.\\d{2}.\\d{2}$"))
                isMatch = true;
            else if (Regex.IsMatch(data, "^\\d{4}.\\d{2}.\\d{2}$"))
                isMatch = true;

            return isMatch;
        }
    }
}