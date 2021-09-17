namespace SqlMapperLib.SqlTypes.Types
{
    public class NVarChar : ISqlType
    {
        public override string ToString()
        {
            return "NVARCHAR(MAX)";
        }
    }
}