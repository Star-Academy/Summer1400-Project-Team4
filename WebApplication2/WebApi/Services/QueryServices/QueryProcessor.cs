using WebApi.Services.Sql;

namespace WebApi.Services.QueryServices
{
    public abstract class QueryProcessor
    {
        public abstract string Instruction { get; set; }

        public abstract void Handle(ISqlConnection applyingSql, string startingDatasetName,
            string destinationDatasetName);
    }
}