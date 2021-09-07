namespace WebApplication2.models.BoolAlgebraModels
{
    public abstract class BoolOperation : IStatement
    {
        public string Command{ get; set; }
        public IStatement _leftStatement{ get; set; }
        public IStatement _rightStatement{ get; set; }

        protected BoolOperation(IStatement leftStatement, IStatement rightStatement)
        {
            _leftStatement = leftStatement;
            _rightStatement = rightStatement;
        }

        protected BoolOperation()
        {
        }

        public override string ToString()
        {
            return $"( {_leftStatement.ToString()} {Command} {_rightStatement.ToString()})";
        }
    }
}