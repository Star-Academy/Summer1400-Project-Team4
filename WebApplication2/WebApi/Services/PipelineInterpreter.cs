using System;
using System.Collections.Generic;
using WebApi.models;
using WebApi.Services.QueryServices;

namespace WebApi.Services
{
    public static class PipelineInterpreter
    {
        public static IEnumerable<QueryProcessor> GetQueriesList(Pipeline pipeline)
        {
            var queriesList = new List<QueryProcessor>();
            if (pipeline?.Processes == null) throw new Exception("There are no processes to handle");

            foreach (var process in pipeline.Processes)
                switch (process.Type)
                {
                    case "filter":
                        queriesList.Add(new FilterProcessor(process.Instruction));
                        break;
                    case "join":
                        queriesList.Add(new JoinProcessor(process.Instruction));
                        break;
                    case "aggregate":
                        queriesList.Add(new AggregationProcessor(process.Instruction));
                        break;
                    case "sort":
                        queriesList.Add(new SortProcessor(process.Instruction));
                        break;
                }

            return queriesList;
        }
    }
}