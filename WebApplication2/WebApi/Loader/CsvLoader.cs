using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using Microsoft.Data.SqlClient;
using WebApi.Model;
using WebApi.Services;

namespace WebApi.Loader
{
    public class CsvLoader
    {
        private readonly CsvProp _csvProp;
        private StreamReader _streamReader;
        private const int FirstRow = 2;

        public CsvLoader(CsvProp csvProp)
        {
            _csvProp = csvProp; }

        public bool TransportCsvToSql()
        {
            var newTableQuery = GenerateCreateTableQuery();
            var bulkQuery = GenerateBulkQuery();
            ExecuteCommands(newTableQuery);
            ExecuteCommands(bulkQuery);
            return true;
        }

        private string GenerateBulkQuery()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append($"BULK INSERT {_csvProp.TableName}\n");
            stringBuilder.Append($"FROM '{_csvProp.FilePath}'\n");
            stringBuilder.Append("WITH (\n" +
                                 $"FIRSTROW = {FirstRow},\n" +
                                 $"FIELDTERMINATOR = '{_csvProp.FieldTerminator}',\n" +
                                 $"ROWTERMINATOR = '{_csvProp.RowTerminator}',\n" +
                                 "TABLOCK\n" +
                                 ");");
            return stringBuilder.ToString();
        }

        private string GenerateCreateTableQuery()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append("CREATE TABLE " + _csvProp.TableName + " (\n");
            var fields = _streamReader.ReadLine()?.Split(_csvProp.FieldTerminator);
            Debug.Assert(fields != null, nameof(fields) + " != null");
            if (_csvProp.DoesHaveHeader)
            {
                foreach (var header in fields)
                {
                    stringBuilder.Append(header + " NVARCHAR(255),\n");
                }
            }
            else
            {
                for (var i = 0; i < fields.Length; i++)
                {
                    stringBuilder.Append($"field{i + 1} " + " NVARCHAR(255),\n");
                }
            }


            stringBuilder.Append(");");
            return stringBuilder.ToString();
        }
        
        public string[] GetColumn(int columnNumber)
        {
            var column = new List<string>();
            _streamReader = new StreamReader(_csvProp.FilePath);
            while (!_streamReader.EndOfStream)
            {
                var row = _streamReader.ReadLine()?.Split(_csvProp.FieldTerminator);
                if (row != null) column.Add(row[columnNumber]);
            }

            return column.ToArray();
        }

        private void ExecuteCommands(string query)
        {
            using var connection = new DbConnector().Connect("localhost", "newdb");
            connection.Open();
            var sqlCommand = new SqlCommand(query, connection);
            sqlCommand.ExecuteNonQuery();
            sqlCommand.Dispose();
            connection.Close();
        }
    }
}