using System.Collections.Generic;

namespace WebApi.models.Table
{
    public class SimpleTable
    {
        public SimpleTable(List<Row> tableRows)
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