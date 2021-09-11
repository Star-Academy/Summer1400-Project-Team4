using System;
using System.Text.Json;
using WebApplication2.models;
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

        // private static string InterpretToSql(string instruction, string startingDatasetName,
        //     string destinationDatasetName)
        // {
        //     var aggregation = JObject.Parse(instruction);
        //
        //     string groupBy;
        //     if (aggregation["GroupBy"] == null)
        //     {
        //         groupBy = "";
        //     }
        //     else
        //     {
        //         groupBy = $"GROUP BY {aggregation["GroupBy"]}";
        //     }
        //
        //     return $"SELECT {aggregation["Operation"]}({aggregation["OperatingField"]})" +
        //            $" as {aggregation["OutputFieldName"]} INTO {destinationDatasetName}" +
        //            $" FROM {startingDatasetName} {groupBy}";
        // }

        public static string InterpretToSql(string instruction, string startingDatasetName,
            string destinationDatasetName)
        {
            var aggregation = JsonSerializer.Deserialize<AggregateConfig>(instruction);

            if (aggregation == null)
            {
                return "";
            }

            return $"SELECT {aggregation.GetAggregateOperationSqlCommands()} INTO {destinationDatasetName}" +
                   $" FROM {startingDatasetName} GROUP BY {aggregation.GetGroupBySqlCommands()}";
        }
    }
}