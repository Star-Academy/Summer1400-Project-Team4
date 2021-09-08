namespace WebApplication2.models.BoolAlgebraModels
{
    public abstract class BoolOperation : IStatement
    {
        protected string Command;
        private readonly IStatement _leftStatement;
        private readonly IStatement _rightStatement;

        protected BoolOperation(IStatement leftStatement, IStatement rightStatement)
        {
            _leftStatement = leftStatement;
            _rightStatement = rightStatement;
        }

        public override string ToString()
        {
            return $"( {_leftStatement.ToString()} {Command} {_rightStatement.ToString()})";
        }
    }
}