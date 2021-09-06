using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using SqlMapper.Checkers.DateTypeCheckers;
using SqlMapper.Checkers.ExactNumericCheckers;
using SqlMapper.SqlTypes;
using SqlMapper.SqlTypes.Types;

namespace SqlMapper.Extensions
{
    public static class MapToSqlDataType
    {
        public static ISqlType ToSqlType(this IEnumerable<string> column)
        {
            var mapper = new Mapper(column);
            return mapper.MapToSqlType();
        }
    }
}