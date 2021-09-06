using Microsoft.Data.SqlClient;

namespace WebApi.Services
{
    public interface ISqlConnector
    {
        public SqlConnection Connect(string host, string database);
    }
}