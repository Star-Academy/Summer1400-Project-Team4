namespace WebApi.models.BoolAlgebraModels.RelationalOperations
{
    public class LessThanOperation : RelationalOperation
    {
        public LessThanOperation(string field, string value) : base(field, value)
        {
            Command = "<";
        }
    }
}