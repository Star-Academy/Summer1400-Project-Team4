using System.Collections.Generic;

namespace WebApi.models.Table
{
    public class SimpleTable
    {
        public SimpleTable()
        {
            TableRows = new List<Row>();
        }
        public List<Row> TableRows { get; }

        public void AddRow(Row newRow)
        {
            TableRows.Add(newRow);
        }
    }
}