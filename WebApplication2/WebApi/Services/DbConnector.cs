using Microsoft.Data.SqlClient;

namespace WebApi.Services
{
    public class DbConnector : ISqlConnector
    {
        public static string LocalConnectionString => "Server=localhost;Database=Etl;Trusted_Connection=true";

        public static string ServerConnectionString =>
            "workstation id=team4DB.mssql.somee.com;packet size=4096;user id=team4_SQLLogin_1;pwd=ke7eltso65;data source=team4DB.mssql.somee.com;persist security info=False;initial catalog=team4DB";

        public SqlConnection Connect(string host, string database)
        {
            var connectionString = $"Server={host};Database={database};Trusted_Connection=true";
            var connection = new SqlConnection(connectionString);
            return connection;
        }

        public SqlConnection Connect(string connectionString)
        {
            var connection = new SqlConnection(connectionString);
            return connection;
        }

        public static SqlConnection DefaultConnection(string type )
        {
            if (type == "server")
            {
                var connection = new SqlConnection(ServerConnectionString);
                return connection;
            }
            else
            {
                var connection = new SqlConnection(LocalConnectionString);
                return connection;
            }
        }
    }
}