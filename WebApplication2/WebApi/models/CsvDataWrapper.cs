using System;

namespace WebApi.models
{
    public class CsvDataWrapper
    {
        public string DatasetName { get; }
        public string CsvAsString { get; }
        public string RowSeparator { get; }
        public string FieldSeparator { get; }
        public bool DoesHaveHeader { get; }
    }
}