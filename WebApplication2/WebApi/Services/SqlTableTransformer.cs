using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.Data.SqlClient;
using WebApi.models.Table;
using Database = WebApi.models.Database;

namespace WebApi.Services
{
    public class SqlTableTransformer
    {
        private readonly Database _database;

        public SqlTableTransformer(Database database)
        {
            _database = database;
        }

        public SimpleTable TransferData(int datasetId, int lowerBound, int upperBound)
        {
            _database.Datasets.Find(datasetId);
            var table = new DataTable();
            FillDataTable(datasetId, upperBound, table);
            var simpleDataTable = new SimpleTable();
            AddTableHeaders(table, simpleDataTable);
            AddTableRows(lowerBound, upperBound, table, simpleDataTable);
            return simpleDataTable;
        }

        private void AddTableRows(int lowerBound, int upperBound, DataTable table, SimpleTable simpleDataTable)
        {
            for (var i = lowerBound; i < upperBound; i++)
            {
                var row = new Row(table.Rows[i].ItemArray.Select(s => s != null ? s.ToString() : ""));
                simpleDataTable.AddRow(row);
            }
        }

        private void AddTableHeaders(DataTable table, SimpleTable simpleDataTable)
        {
            var columnNames = new Row(table.Columns.Cast<DataColumn>()
                .Select(x => x.ColumnName)
                .ToArray());
            simpleDataTable.AddRow(columnNames);
        }

        private void FillDataTable(int datasetId, int upperBound, DataTable table)
        {
            var query =
                $"SELECT TOP({upperBound}) * FROM _{datasetId} ";
            var connectionString = DbConnector.LocalConnectionString;
            using var dataAdapter = new SqlDataAdapter(query, connectionString);
            dataAdapter.Fill(table);
        }
    }
}