using Microsoft.Data.SqlClient;

namespace WebApplication2.Services
{
    public interface ITableCreator
    {
        public void SqlTableToDataTableConvertor(SqlConnection sqlConnection, string tableName);
    }
}