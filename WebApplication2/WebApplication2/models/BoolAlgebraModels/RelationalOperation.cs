namespace WebApplication2.models.BoolAlgebraModels
{
    public abstract class RelationalOperation : IStatement
    {
        protected string Command;
        private readonly string _field;
        private readonly string _value; 

        protected RelationalOperation(string field, string value)
        {
            _field = field;
            _value = value;
        }

        public override string ToString()
        {
            return $"{_field} {Command} {_value}";
        }
    }
}