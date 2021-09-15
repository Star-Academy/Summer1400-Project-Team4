using System.Linq;
using Newtonsoft.Json;

namespace WebApi.models.boolAlgebra
{
    public class FilterOperation
    {
        [JsonProperty] protected string Command;

        [JsonProperty] private dynamic[] _statements;

        public override string ToString()
        {
            var interpretedStatements = _statements.Select(statement =>
                BoolStatementInterpreter.InterpretStatement(statement.ToString())).Cast<string>().ToList();

            return string.Join(" " + Command + " ", interpretedStatements);
        }
    }
}