namespace WebApplication2.models.BoolAlgebraModels.RelationalOperations
{
    public class LessThanOperation : RelationalOperation
    {
        public LessThanOperation(string field , string value) : base(field , value)
        {
            Command = "<"; 
        }

        public LessThanOperation()
        {
        }
    }
}