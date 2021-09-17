using System.Linq;
using Newtonsoft.Json;

namespace WebApi.models.boolAlgebra
{
    public class FilterOperation
    {
        [JsonProperty] protected string Command;

        [JsonProperty] private dynamic[] _statement;

        public override string ToString()
        {
            var interpretedStatements = _statement.Select(statement =>
                BoolStatementInterpreter.InterpretStatement(statement.ToString())).Cast<string>().ToList();

            return string.Join(" " + Command + " ", interpretedStatements);
        }
    }
}