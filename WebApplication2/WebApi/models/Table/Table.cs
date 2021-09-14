using System.Collections.Generic;

namespace WebApi.models.Table
{
    public class Table
    {
        public Table(List<Row> tableRows)
        {
            TableRows = tableRows;
        }

        public List<Row> TableRows { get; set;  }

        public void AddRow(Row newRow)
        {
            TableRows.Add(newRow);
        }
    }
}