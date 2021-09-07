namespace WebApplication2.models.BoolAlgebraModels.BoolOperations
{
    public class OrOperation : BoolOperation
    {
        public OrOperation(IStatement leftStatement, IStatement rightStatement) : base(leftStatement, rightStatement)
        {
            Command = "OR";
        }
    }
}