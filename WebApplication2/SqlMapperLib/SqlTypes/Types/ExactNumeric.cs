using System;
using SqlMapper.SqlTypes.TypesSubset;
using SqlMapperLib.SqlTypes;

namespace SqlMapper.SqlTypes.Types
{
    public class ExactNumeric : ISqlType
    {
        public ExactNumericTypes Type { get; }

        public ExactNumeric(ExactNumericTypes types)
        {
            Type = types;
        }

        public override string ToString()
        {
            return Type switch
            {
                ExactNumericTypes.TinyInt => "TINYINT",
                ExactNumericTypes.SmallInt => "SMALLINT",
                ExactNumericTypes.Int => "INT",
                ExactNumericTypes.BigInt => "BIGINT", 
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}