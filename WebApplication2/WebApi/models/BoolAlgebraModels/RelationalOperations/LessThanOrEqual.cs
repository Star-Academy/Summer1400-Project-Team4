namespace WebApi.models.BoolAlgebraModels.RelationalOperations
{
    public class LessThanOrEqual : RelationalOperation
    {
        public LessThanOrEqual(string field, string value) : base(field, value)
        {
            Command = "<=";
        }
    }
}