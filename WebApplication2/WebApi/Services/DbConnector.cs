using Microsoft.Data.SqlClient;

namespace WebApi.Services
{
    public class DbConnector : ISqlConnector
    {
        public static string DefaultConnectionString => "Server=localhost;Database=Etl;Trusted_Connection=true";

        public SqlConnection Connect(string host, string database)
        {
            var connectionString = $"Server={host};Database={database};Trusted_Connection=true";
            var connection = new SqlConnection(connectionString);
            return connection;
        }

        public static SqlConnection DefaultConnection()
        {
            var connection = new SqlConnection(DefaultConnectionString);
            return connection;
        }
    }
}