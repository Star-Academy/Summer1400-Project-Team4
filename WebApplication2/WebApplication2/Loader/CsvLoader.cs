using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.Data.SqlClient;
namespace WebApplication2.Loader
{
    public class CsvLoader
    {
        private string _filePath;
        private string[] _firstLine;
        private string _tableName;
        private StreamReader _streamReader;
        public string NewTableCommand { get; private set; }
        public string ImportCsvCommand { get; private set; }
        public string FieldTerminator = ",";
        public string RowTerminator = "\\n";
        public int FirstRow = 2;

        public void Load(string filePath, string newTableName)
        {
            _filePath = filePath;
            _tableName = newTableName;
            _streamReader = new StreamReader(_filePath);
            _firstLine = _streamReader.ReadLine()?.Split(FieldTerminator);
            CreateNewTableCommand();
            ImportFromCsvCommand();
            ExecuteCommands();
        }

        private void ImportFromCsvCommand()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append($"BULK INSERT {_tableName}\n");
            stringBuilder.Append($"FROM '{_filePath}'\n");
            stringBuilder.Append("WITH (\n" +
                                 $"FIRSTROW = {FirstRow},\n" +
                                 $"FIELDTERMINATOR = '{FieldTerminator}',\n" +
                                 $"ROWTERMINATOR = '{RowTerminator}',\n" +
                                 "TABLOCK\n" +
                                 ");");
            ImportCsvCommand = stringBuilder.ToString();
        }

        private void CreateNewTableCommand()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append("CREATE TABLE " + _tableName + " (\n");
            foreach (var s in _firstLine)
            {
                stringBuilder.Append(s + " NVARCHAR(255),\n");
            }
            stringBuilder.Append(");");
            NewTableCommand = stringBuilder.ToString();
        }


        public string[] GetColumn(int columnNumber)
        {
            var column = new List<string>();
            _streamReader = new StreamReader(_filePath);
            while (!_streamReader.EndOfStream)
            {
                var row = _streamReader.ReadLine()?.Split(FieldTerminator);
                if (row != null) column.Add(row[columnNumber]);
            }
            return column.ToArray();
        }

        private void ExecuteCommands()
        {
            using var connection = new ClientDbConnector().Connect("localhost", "newdb");
            connection.Open();
            var sqlCommand = new SqlCommand(NewTableCommand, connection);
            sqlCommand.ExecuteNonQuery();
            sqlCommand.Dispose();
            sqlCommand = new SqlCommand(ImportCsvCommand, connection);
            sqlCommand.ExecuteNonQuery();
            sqlCommand.Dispose();
        }
    }
}