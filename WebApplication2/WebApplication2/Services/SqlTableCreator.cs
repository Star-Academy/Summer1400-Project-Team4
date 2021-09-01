using System.Data;
using Microsoft.Data.SqlClient;

namespace WebApplication2.Services
{
    public class SqlTableCreator : ITableCreator
    {
        private SqlConnection _serverDbConnection;
        private DataTable _dataTable;

        public SqlTableCreator(SqlConnection serverDbConnection, DataTable dataTable)
        {
            _serverDbConnection = serverDbConnection;
            _dataTable = dataTable;
        }

        public void SqlTableToDataTableConvertor(SqlConnection sqlConnection, string tableName)
        {
            var queryString = $"SELECT * FROM {tableName}";
            sqlConnection.Open();
            using var dataAdapter = new SqlDataAdapter(queryString, sqlConnection);
            dataAdapter.Fill(_dataTable);
            dataAdapter.Dispose();
            sqlConnection.Close();
        }

        public void DataTableToServerDataTableConvertor()
        {
            var queryString = $"";
        }
    }
}