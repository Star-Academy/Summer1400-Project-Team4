using System.Collections.Generic;
using SqlMapper;
using SqlMapper.SqlTypes;
using SqlMapperLib.SqlTypes;

namespace SqlMapperLib.Extensions
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