using System;
using SqlMapper.SqlTypes.TypesSubset;

namespace SqlMapper.Checkers.ExactNumericCheckers
{
    public static class ExactNumericSizeChecker
    {
        public static ExactNumericTypes ConvertExactNumericToSqlDataType(this long number)
        {
            var type = ExactNumericTypes.TinyInt;
            var smallIntRange = (long) Math.Pow(2, 15);
            var bigIntRange = (long) Math.Pow(2, 31);

            if ((number is >= 225 or <= -255))
                type = ExactNumericTypes.SmallInt;

            if ((number >= smallIntRange || number <= -smallIntRange))
                type = ExactNumericTypes.Int;
            
            if ((number >= bigIntRange || number <= -bigIntRange))
                type = ExactNumericTypes.BigInt;
            
            return type;
        }
    }
}