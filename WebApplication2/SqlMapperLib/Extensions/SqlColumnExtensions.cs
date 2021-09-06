using System;
using System.Collections.Generic;
using System.Linq;
using SqlMapper.Checkers.ApproximateNumericCheckers;

namespace SqlMapper.Extensions
{
    public static class SqlColumnExtensions
    {
        public static long GreatestElement(this IEnumerable<string> column)
        {
            try
            {
                var largest = column.Select(long.Parse).Max();
                return largest;
            }
            catch (FormatException)
            {
                throw new WrongSqlFormatException();
            }
        }

        internal static int MaxDigits(this IEnumerable<string> column)
        {
            try
            {
                var digitsNumber = column.Select(data => decimal.Parse(data).Length()).Max();
                return digitsNumber;
            }
            catch (FormatException)
            {
                throw new WrongSqlFormatException();
            }
        }
    }
}