namespace WebApplication2.models
{
    public class AggregateOperation
    {
        public string FieldName { get; set; }
        public string Type { get; set; }
        public string OutputFieldName { get; set; }

        public override string ToString()
        {
            return $"{Type}({FieldName}) as {OutputFieldName}";
        }
    }
}