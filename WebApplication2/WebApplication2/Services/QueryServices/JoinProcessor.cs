using System;
using Newtonsoft.Json.Linq;
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

        public override void Handle(ISqlConnection applyingSql, string startingDatasetName,
            string destinationDatasetName)
        {
            applyingSql.SendQuery("SELECT * " +
                                  $"INTO {destinationDatasetName} " +
                                  $"FROM {startingDatasetName} " +
                                  $"{InterpretToSql(Instruction, startingDatasetName)}");
        }

        private static string InterpretToSql(string instruction, string startingDatasetName)
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