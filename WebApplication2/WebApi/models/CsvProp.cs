namespace WebApi.models
{
    public class CsvProp
    {
        public string FilePath { get; }
        public string TableName { get; }
        public bool DoesHaveHeader { get; }
        public string FieldTerminator { get; }
        public string RowTerminator { get; }

        public CsvProp(string filePath, string tableName, bool doesHaveHeader, string rowTerminator,
            string fieldTerminator)
        {
            FilePath = filePath;
            TableName = tableName;
            DoesHaveHeader = doesHaveHeader;
            RowTerminator = rowTerminator;
            FieldTerminator = fieldTerminator;
        }
    }
}