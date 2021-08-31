using Microsoft.Data.SqlClient;

namespace WebApplication2.Services
{
    public interface ITableCreator
    {
        public void CopySql(SqlConnection sqlConnection, string tableName);
    }
}