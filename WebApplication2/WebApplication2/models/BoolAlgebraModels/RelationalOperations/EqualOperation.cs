namespace WebApplication2.models.BoolAlgebraModels.RelationalOperations
{
    public class EqualOperation : RelationalOperation
    {
        public EqualOperation(string field, string value) : base(field, value)
        {
            Command = "=";
        }
    }
}