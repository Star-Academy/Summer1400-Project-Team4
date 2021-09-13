using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using WebApi.Authentication;
using WebApi.models;
using Database = WebApi.models.Database;

namespace WebApi.Services
{
    public class SqlTableTransformer
    {
        private Database _database;

        public SqlTableTransformer(Database database)
        {
            _database = database;
        }

        public async Task<DataTable> TransferData(int datasetId, int lowerBound, int upperBound)
        {
            await _database.Datasets.FindAsync(datasetId);
            var table = new DataTable();
            var query =
                $"SELECT TOP({upperBound}) * FROM _{datasetId} " +
                $" EXCEPT SELECT TOP({lowerBound}) * FROM FROM _{datasetId}";
            var connectionString = DbConnector.DefaultConnectionString;
            using var dataAdapter = new SqlDataAdapter(query, connectionString);
            dataAdapter.Fill(table);
            return table;
        }
    }
}