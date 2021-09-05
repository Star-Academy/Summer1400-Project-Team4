using Microsoft.Data.SqlClient;

namespace WebApplication2.Services
{
    public interface ITableCreator
    {
        public void CopySql(string serverName, string databaseName, string sourceTableName, string destTableName);
    }
}