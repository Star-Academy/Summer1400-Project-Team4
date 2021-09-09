using Microsoft.Data.SqlClient;

namespace WebApi.Services
{
    public interface ITableCreator
    {
        public void CopySql(string serverName, string databaseName, string sourceTableName, string destTableName);
    }
}