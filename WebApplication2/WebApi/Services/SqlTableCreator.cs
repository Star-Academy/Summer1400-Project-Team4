using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Microsoft.Data.SqlClient;

namespace WebApi.Services
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

        public void CopySql(string connectionString)
        {
            using var connection = new DbConnector().Connect(connectionString);
            connection.Open();
            var table = new DataTable();
            using var da = new SqlDataAdapter($"SELECT * FROM {null}", connectionString);
            da.Fill(table);
            var csvFile = GetCsvFromDataTable(table);
            
        }

        private string GetCsvFromDataTable(DataTable table)
        {
            StringBuilder sb = new StringBuilder(); 

            IEnumerable<string> columnNames = table.Columns.Cast<DataColumn>().
                Select(column => column.ColumnName);
            sb.AppendLine(string.Join(",", columnNames));

            foreach (DataRow row in table.Rows)
            {
                IEnumerable<string> fields = row.ItemArray.Select(field => field.ToString());
                sb.AppendLine(string.Join(",", fields));
            }

            return sb.ToString();
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