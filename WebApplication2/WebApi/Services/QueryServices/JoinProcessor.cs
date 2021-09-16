using System;
using Newtonsoft.Json.Linq;
using WebApi.Services.Sql;

namespace WebApi.Services.QueryServices
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
                                  $"{InterpretToSql(Instruction.Replace("\\\"", "\""), startingDatasetName)}");
        }

        private static string InterpretToSql(string instruction, string startingDatasetName)
        {
            var joinDetails = JObject.Parse(instruction);

            string joinKeys;
            if (joinDetails["LeftTableKey"] == null || joinDetails["RightTableKey"] == null)
                joinKeys = "";
            else
                joinKeys =
                    $"ON {startingDatasetName}.{joinDetails["LeftTableKey"]}=_{joinDetails["JoinWith"]}.{joinDetails["RightTableKey"]}";

            return $"{joinDetails["Type"]} _{joinDetails["JoinWith"]} {joinKeys}";
        }
    }
}