using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace WebApplication2.Loader
{
    public class CsvLoader
    {
        private const string FilePath = "E://covid.csv";
        private string[] _firstLine;
        private string _tableName;
        private StreamReader _streamReader;
        private string _newTableCommand;
        private string _importCsvCommand;
        private string _fieldSeparator;

        public void Load()
        {
            _fieldSeparator = ",";
            _tableName = "temp";
            _streamReader = new StreamReader(FilePath);
            _firstLine = _streamReader.ReadLine()?.Split(',');
            CreateNewTableCommand();
            ImportFromCsvCommand();
        }

        private void ImportFromCsvCommand()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.Append($"BULK INSERT {_tableName}\n");
            stringBuilder.Append($"FROM {FilePath}\n");
            stringBuilder.Append($"WITH (\nFIRSTROW = 2,\nFIELDTERMINATOR = '{_fieldSeparator}',\nROWTERMINATOR = '\\n',\nTABLOCK\n);");
            _importCsvCommand = stringBuilder.ToString();
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
            _newTableCommand = stringBuilder.ToString();
        }


        public string[] GetColumn(int columnNumber)
        {
            var column = new List<string>();
            _streamReader = new StreamReader(FilePath);
            while (!_streamReader.EndOfStream)
            {
                var row = _streamReader.ReadLine()?.Split(_fieldSeparator);
                if (row != null) column.Add(row[columnNumber]);
            }
            return column.ToArray();
        }
    }
}