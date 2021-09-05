using System;
using System.Collections.Generic;
using System.Linq;
using WebApplication2.models;
using WebApplication2.Services.QueryServices;
using WebApplication2.Services.Sql;

namespace WebApplication2.Services
{
    public class PipelineExecutor
    {
        private readonly List<QueryProcessor> _queriesList;
        private readonly SqlConnection _sqlConnection;

        public PipelineExecutor(string connectionString, Pipeline pipeline)
        {
            _queriesList = JsonPipelineInterpreter.GetQueriesList(pipeline).ToList();
            _sqlConnection = new SqlConnection(connectionString);
        }

        public void Execute(string startingDatasetName, string destinationDatasetName)
        {
            string startingTempTableName;
            string endingTempTableName = "";
            foreach (var query in _queriesList)
            {
                if (query == _queriesList[0])
                {
                    startingTempTableName = startingDatasetName;
                }
                else
                {
                    startingTempTableName = endingTempTableName;
                }

                if (query == _queriesList[^1])
                {
                    endingTempTableName = destinationDatasetName;
                }
                else
                {
                    endingTempTableName = Guid.NewGuid().ToString("n");
                }
                query.Handle(_sqlConnection, startingTempTableName, endingTempTableName);
            }
        }
    }
}