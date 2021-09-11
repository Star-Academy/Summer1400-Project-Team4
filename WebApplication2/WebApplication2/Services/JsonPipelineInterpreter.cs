﻿using System;
using System.Collections.Generic;
using WebApplication2.models;
using WebApplication2.Services.QueryServices;

namespace WebApplication2.Services
{
    public static class JsonPipelineInterpreter
    {
        public static IEnumerable<QueryProcessor> GetQueriesList(Pipeline pipeline)
        {
            var queriesList = new List<QueryProcessor>();
            if (pipeline?.Processes == null) throw new Exception("There are no processes to handle");

            foreach (var process in pipeline.Processes)
                switch (process.Name)
                {
                    case "filter":
                        queriesList.Add(new FilterProcessor(process.Instruction));
                        break;
                    case "join":
                        queriesList.Add(new JoinProcessor(process.Instruction));
                        break;
                    case "aggregation":
                        queriesList.Add(new AggregationProcessor(process.Instruction));
                        break;
                }

            return queriesList;
        }
    }
}