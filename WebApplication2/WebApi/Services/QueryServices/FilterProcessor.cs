using System;
using Newtonsoft.Json;
using WebApi.models.boolAlgebra;
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
            try
            {
                applyingSql.SendQuery($"DROP TABLE {destinationDatasetName}");
            }
            catch (Exception)
            {
                // ignored
            }

            applyingSql.SendQuery("SELECT * " +
                                  $"INTO {destinationDatasetName} " +
                                  $"FROM {startingDatasetName} " +
                                  $"WHERE {InterpretToSql(Instruction.Replace("\\\"", "\""))} ");
        }

        private static string InterpretToSql(string instruction)
        {
            if (!instruction.Contains("_statement"))
            {
                instruction = "{\"Command\": \"OR\", \"_statement\": [" + instruction + "]}";
            }

            var filterBooleanStatement = JsonConvert.DeserializeObject<FilterOperation>(instruction);
            return filterBooleanStatement.ToString();
        }
    }
}