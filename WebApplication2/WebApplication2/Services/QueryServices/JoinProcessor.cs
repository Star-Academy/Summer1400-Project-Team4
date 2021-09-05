using System;
using WebApplication2.Services.Sql;

namespace WebApplication2.Services.QueryServices
{
    public class JoinProcessor : QueryProcessor
    {
        public JoinProcessor(string instruction)
        {
            Instruction = instruction;
        }

        public sealed override string Instruction { get; set; }

        public override void Handle(ISqlConnection applyingSql, string startingDatasetName, string destinationDatasetName)
        {
            throw new NotImplementedException();
        }
    }
}