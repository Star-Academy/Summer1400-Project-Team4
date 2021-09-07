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
            applyingSql.SendQuery($"{InterpretToSql(Instruction.Replace("\\\"", "\""), startingDatasetName, destinationDatasetName)}");
        }

        private static string InterpretToSql(string instruction, string startingDatasetName,
            string destinationDatasetName)
        {
            var joinDetails = JObject.Parse(instruction);

            string joinKeys;
            if (joinDetails["LeftTableKey"] == null || joinDetails["RightTableKey"] == null)
            {
                joinKeys = "";
            }
            else
            {
                joinKeys =
                    $"ON {startingDatasetName}.{joinDetails["LeftTableKey"]}=_{joinDetails["JoinWith"]}.{joinDetails["RightTableKey"]}";
            }

            return $"{joinDetails["Type"]} _{joinDetails["JoinWith"]} {joinKeys}";
        }
    }
}