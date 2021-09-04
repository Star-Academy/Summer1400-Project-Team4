using System.Data;
using Microsoft.Data.SqlClient;

namespace WebApplication2.Services.Sql
{
    public class SqlConnection : ISqlConnection
    {
        private readonly string _connectionString;
        private Microsoft.Data.SqlClient.SqlConnection _sqlConnection;

        public SqlConnection(string connectionString)
        {
            _connectionString = connectionString;
            Initialize();
        }

        public void Initialize()
        {
            _sqlConnection = new Microsoft.Data.SqlClient.SqlConnection(_connectionString);
        }

        public void SendQuery(string query)
        {
            var sqlCommand = new SqlCommand
            {
                CommandText = query, CommandType = CommandType.Text, Connection = _sqlConnection
            };
            _sqlConnection.Open();
            sqlCommand.ExecuteReader();
            _sqlConnection.Close();
        }
    }
}