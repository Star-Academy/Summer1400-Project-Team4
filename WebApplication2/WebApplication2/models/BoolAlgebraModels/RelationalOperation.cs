using Newtonsoft.Json;

namespace WebApplication2.models.BoolAlgebraModels
{
    public abstract class RelationalOperation : IStatement
    {
        [JsonProperty] private readonly string _field;

        [JsonProperty] private readonly string _value;

        [JsonProperty] protected string Command;

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