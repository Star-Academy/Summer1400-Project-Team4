namespace WebApplication2.models.BoolAlgebraModels
{
    public abstract class RelationalOperation : IStatement
    {
        public string Command { get; set; }
        public string _field { get; set; }
        public string _value { get; set; }

        protected RelationalOperation(string field, string value)
        {
            _field = field;
            _value = value;
        }

        public RelationalOperation()
        {
        }

        public override string ToString()
        {
            return $"{_field} {Command} {_value}";
        }
    }
}