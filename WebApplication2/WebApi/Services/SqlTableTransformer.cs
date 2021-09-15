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

        public SimpleTable TransferData(int datasetId, int lowerBound, int upperBound)
        {
            _database.Datasets.Find(datasetId);
            var table = new DataTable();
            FillDataTable(datasetId, upperBound, table);
            var simpleDataTable = new SimpleTable(new List<Row>());
            AddTableHeaders(table, simpleDataTable);
            AddTableRows(lowerBound, table, simpleDataTable);
            return simpleDataTable;
        }

        private  void AddTableRows(int lowerBound, DataTable table, SimpleTable simpleDataTable)
        {
            for (var i = lowerBound; i <= table.Rows.Count; i++)
            {
                var row = new Row(table.Rows[i].ItemArray.Select(s => s != null ? s.ToString() : ""));
                simpleDataTable.AddRow(row);
            }
        }

        private  void AddTableHeaders(DataTable table, SimpleTable simpleDataTable)
        {
            var columnNames = new Row(table.Columns.Cast<DataColumn>()
                .Select(x => x.ColumnName)
                .ToArray());
            simpleDataTable.AddRow(columnNames);
        }

        private  void FillDataTable(int datasetId, int upperBound, DataTable table)
        {
            var query =
                $"SELECT TOP({upperBound}) * FROM _{datasetId} ";
            var connectionString = DbConnector.DefaultConnectionString;
            using var dataAdapter = new SqlDataAdapter(query, connectionString);
            dataAdapter.Fill(table);
        }
    }
}