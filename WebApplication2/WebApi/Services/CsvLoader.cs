﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Text;
using Microsoft.Data.SqlClient;
using WebApi.models;

namespace WebApi.Services
{
    public class CsvLoader
    {
        private readonly CsvProp _csvProp;
        private string _filePath;
        private const int FirstRow = 2;
        private readonly int _dataSetId; 

        public CsvLoader(CsvProp csvProp, int dataSetId)
        {
            _csvProp = csvProp;
            _dataSetId = dataSetId;
        }

        public bool TransportCsvToSql()
        {
            CreatePath();
            var newTableQuery = GenerateCreateTableQuery();
            var bulkQuery = GenerateBulkQuery();
            Console.WriteLine(newTableQuery);
            Console.WriteLine(bulkQuery);
            ExecuteCommands(newTableQuery);
            ExecuteCommands(bulkQuery);
            DeletePath(); 
            return true;
        }

        private void DeletePath()
        {
            File.Delete(_filePath);
        }

        private string GenerateBulkQuery()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append($"BULK INSERT _{_dataSetId}\n");
            stringBuilder.Append($"FROM '{_filePath}'\n");
            stringBuilder.Append("WITH (\n" +
                                 $"FIRSTROW = {FirstRow},\n" +
                                 $"FIELDTERMINATOR = ',',\n" +
                                 $"ROWTERMINATOR = '\\n',\n" +
                                 "TABLOCK\n" +
                                 ");");
            return stringBuilder.ToString();
        }

        private string GenerateCreateTableQuery()
        {
            var stringBuilder = new StringBuilder();
            var streamReader = new StreamReader(_filePath);
            stringBuilder.Append("CREATE TABLE _" + _dataSetId + " (\n");
            var fields = streamReader.ReadLine()?.Split(_csvProp.FieldTerminator);
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
                    stringBuilder.Append($"field{i + 1} " + " NVARCHAR(MAX),\n");
                }
            }


            stringBuilder.Append(");");
            streamReader.Close();
            return stringBuilder.ToString();
        }
        
        private void ExecuteCommands(string query)
        {
            using var connection = DbConnector.DefaultConnection(); 
            connection.Open();
            var sqlCommand = new SqlCommand(query, connection);
            sqlCommand.ExecuteNonQuery();
            sqlCommand.Dispose();
            connection.Close();
        }

        private void CreatePath()
        {
            var rows = _csvProp.CsvContent.Split(_csvProp.RowTerminator);
            for (var i = 0; i < rows.Length; i++)
            {
                rows[i] = rows[i].Replace(_csvProp.FieldTerminator, ",");
            }

            _filePath = $"_{_dataSetId}.csv";
            File.WriteAllLines(_filePath, rows);
        }
        
        public string[] GetColumn(int columnNumber)
        {
            var column = new List<string>();
            var streamReader = new StreamReader(_filePath);
            while (!streamReader.EndOfStream)
            {
                var row = streamReader.ReadLine()?.Split(_csvProp.FieldTerminator);
                if (row != null) column.Add(row[columnNumber]);
            }

            return column.ToArray();
        }
        
    }
}