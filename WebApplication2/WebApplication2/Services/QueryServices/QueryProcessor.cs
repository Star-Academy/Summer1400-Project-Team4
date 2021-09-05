using WebApplication2.Services.Sql;

namespace WebApplication2.Services.QueryServices
{
    public abstract class QueryProcessor
    {
        public abstract string Instruction { get; set; }
        public abstract void Handle(ISqlConnection applyingSql, string startingDatasetName, string destinationDatasetName);
    }
}