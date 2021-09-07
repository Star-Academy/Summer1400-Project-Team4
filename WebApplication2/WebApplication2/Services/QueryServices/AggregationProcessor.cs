using System;
using Newtonsoft.Json.Linq;
using WebApplication2.Services.Sql;

namespace WebApplication2.Services.QueryServices
{
    public class AggregationProcessor : QueryProcessor
    {
        public AggregationProcessor(string instruction)
        {
            Instruction = instruction;
        }

        public sealed override string Instruction { get; set; }

        public override void Handle(ISqlConnection applyingSql, string startingDatasetName,
            string destinationDatasetName)
        {
            applyingSql.SendQuery(
                $"{InterpretToSql(Instruction.Replace("\\\"", "\""), startingDatasetName, destinationDatasetName)}");
        }

        private static string InterpretToSql(string instruction, string startingDatasetName,
            string destinationDatasetName)
        {
            var aggregation = JObject.Parse(instruction);

            string groupBy;
            if (aggregation["GroupBy"] == null)
            {
                groupBy = "";
            }
            else
            {
                groupBy = $"GROUP BY {aggregation["GroupBy"]}";
            }

            return $"SELECT {aggregation["Operation"]}({aggregation["OperatingField"]})" +
                   $" as {aggregation["OutputFieldName"]} INTO {destinationDatasetName}" +
                   $" FROM {startingDatasetName} {groupBy}";
        }
    }
}