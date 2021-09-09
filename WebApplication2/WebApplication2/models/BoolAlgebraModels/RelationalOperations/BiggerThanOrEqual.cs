namespace WebApplication2.models.BoolAlgebraModels.RelationalOperations
{
    public class BiggerThanOrEqual : RelationalOperation
    {
        public BiggerThanOrEqual(string field , string value) : base(field , value)
        {
            Command = ">=";
        }
    }
}