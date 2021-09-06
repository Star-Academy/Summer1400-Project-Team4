using System;
using System.Text;
using Microsoft.Data.SqlClient;

namespace WebApplication2.Services
{
    public class SqlTableCreator : ITableCreator
    {
        private string _sourceTableName;
        private string _destTableName;
        private string _serverName;
        private string _databaseName;
        
        public void CopySql(string serverName, string databaseName, string sourceTableName, string destTableName)
        {
            _sourceTableName = sourceTableName;
            _destTableName = destTableName;
            _serverName = serverName;
            _databaseName = databaseName;
            if (serverName == "localhost")
                _serverName = string.Empty;
            DoQuery();
        }

        private void DoQuery()
        {
            using var connection = new DbConnector().Connect("localhost", "newdb");
            connection.Open();
            var builder = new StringBuilder();
            builder.Append($"SELECT * INTO {_destTableName} FROM {_serverName}.{_databaseName}.{_sourceTableName}");
            using var sqlCommand = new SqlCommand(builder.ToString(), connection);
            sqlCommand.ExecuteNonQuery();
        }

        
    }
}