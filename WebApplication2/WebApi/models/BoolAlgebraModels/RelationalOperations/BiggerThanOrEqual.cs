namespace WebApi.models.BoolAlgebraModels.RelationalOperations
{
    public class BiggerThanOrEqual : RelationalOperation
    {
        public BiggerThanOrEqual(string field , string value) : base(field , value)
        {
            Command = ">=";
        }
    }
}