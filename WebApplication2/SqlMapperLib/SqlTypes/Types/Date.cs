using SqlMapperLib.SqlTypes;

namespace SqlMapper.SqlTypes.Types
{
    public class Date : ISqlType
    {
        public override string ToString()
        {
            return "DATE";
        }
    }
}