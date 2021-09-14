using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using WebApi.Authentication;
using WebApi.models;
using WebApi.models.Table;
using Database = WebApi.models.Database;
using Table = Microsoft.EntityFrameworkCore.Metadata.Internal.Table;

namespace WebApi.Services
{
    public class SqlTableTransformer
    {
        private readonly Database _database;

        public SqlTableTransformer(Database database)
        {
            _database = database;
        }

        public models.Table.Table TransferData(int datasetId, int lowerBound, int upperBound)
        {
            _database.Datasets.Find(datasetId);
            var table = new DataTable();
            var query =
                $"SELECT TOP({upperBound}) * FROM _{datasetId} ";
            /*+        $" EXCEPT SELECT TOP({lowerBound}) * FROM FROM _{datasetId}";*/
            var connectionString = DbConnector.DefaultConnectionString;
            using var dataAdapter = new SqlDataAdapter(query, connectionString);
            dataAdapter.Fill(table);
            var test = new models.Table.Table(new List<Row>());
            foreach (DataRow tableRow in table.Rows)
            {
                var row = new Row {Data = tableRow.ItemArray.Select(s => s != null ? s.ToString() : "")};
                test.AddRow(row);
            }

            return test;
        }
    }
}