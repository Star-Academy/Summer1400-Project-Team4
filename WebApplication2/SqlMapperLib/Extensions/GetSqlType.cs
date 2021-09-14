using SqlMapper.Checkers.ApproximateNumericCheckers;
using SqlMapper.Checkers.DateTypeCheckers;
using SqlMapper.Checkers.ExactNumericCheckers;
using SqlMapper.SqlTypes;
using SqlMapper.SqlTypes.Types;
using SqlMapperLib.SqlTypes;

namespace SqlMapperLib.Extensions
{
    public static class GetSqlType
    {
        public static ISqlType ToSqlDataType(this string data)
        {
            if (ExactNumericTypeChecker.IsExact(data))
                return new ExactNumeric(long.Parse(data).ConvertExactNumericToSqlDataType());

            if (ApproximateNumericTypeChecker.IsApproximate(data))
                return new ApproximateNumeric(decimal.Parse(data).Length());

            if (DateTypeChecker.IsDate(data))
                return new Date();

            return !string.IsNullOrEmpty(data) ? new NVarChar() : null;
        }
    }
}