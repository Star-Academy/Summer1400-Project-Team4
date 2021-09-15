using System.Data;
using Microsoft.Data.SqlClient;

namespace WebApi.Services.Sql
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
            _sqlConnection.Open();
        }

        public void SendQuery(string query)
        {
            var sqlCommand = new SqlCommand
            {
                CommandText = query, CommandType = CommandType.Text, Connection = _sqlConnection
            };
            sqlCommand.ExecuteReader();
        }

        ~SqlConnection()
        {
            _sqlConnection.Close();
        }
    }
}