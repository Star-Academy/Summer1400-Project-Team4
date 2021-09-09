using Microsoft.Data.SqlClient;

namespace WebApplication2.Services
{
    public interface ISqlConnector
    {
        public SqlConnection Connect(string host, string database);
    }
}