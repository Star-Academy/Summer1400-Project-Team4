using Newtonsoft.Json;

namespace WebApi.models.boolAlgebra
{
    public static class BoolStatementInterpreter
    {
        public static string InterpretStatement(this string statement)
        {
            if (!statement.Contains("_statements"))
            {
                var simpleStatement = JsonConvert.DeserializeObject<dynamic>(statement);
                return simpleStatement._field + " " + simpleStatement.Command + " '" + simpleStatement._value + "'";
            }

            var f = JsonConvert.DeserializeObject<FilterOperation>(statement);
            return "(" + f + ")";
        }
    }
}