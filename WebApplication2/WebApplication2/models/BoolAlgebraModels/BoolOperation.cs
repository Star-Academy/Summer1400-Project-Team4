using Newtonsoft.Json;

namespace WebApplication2.models.BoolAlgebraModels
{
    public abstract class BoolOperation : IStatement
    {
        [JsonProperty]
        protected string Command;
        [JsonProperty]
        private readonly IStatement _leftStatement;
        [JsonProperty]
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