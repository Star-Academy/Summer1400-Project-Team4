using Newtonsoft.Json;
using WebApi.Services.Sql;

namespace WebApi.Services.QueryServices
{
    public class FilterProcessor : QueryProcessor
    {
        public FilterProcessor(string instruction)
        {
            Instruction = instruction;
        }

        public sealed override string Instruction { get; set; }

        public override void Handle(ISqlConnection applyingSql, string startingDatasetName,
            string destinationDatasetName)
        {
            //todo Drop existing destination table before use INTO
            applyingSql.SendQuery("SELECT * " +
                                  $"INTO {destinationDatasetName} " +
                                  $"FROM {startingDatasetName} " +
                                  $"WHERE {InterpretToSql(Instruction)} ");
        }

        private static string InterpretToSql(string instruction)
        {
            var filterBooleanStatement = JsonConvert.DeserializeObject<dynamic>(instruction);
            return filterBooleanStatement.ToString();
        }
    }
}