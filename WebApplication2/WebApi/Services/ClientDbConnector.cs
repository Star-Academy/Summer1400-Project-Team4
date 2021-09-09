using Microsoft.Data.SqlClient;

namespace WebApi.Services
{
    public class ClientDbConnector : ISqlConnector

    {
        public SqlConnection Connect(string host, string database)
        {
            var connectionString = $"Server= {host} ; Database= {database}; Integrated Security=SSPI;";
            var connection = new SqlConnection(connectionString);
            return connection;
        }
    }
}