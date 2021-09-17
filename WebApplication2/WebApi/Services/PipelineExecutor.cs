using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.models;
using WebApi.Services.QueryServices;
using WebApi.Services.Sql;

namespace WebApi.Services
{
    public class PipelineExecutor
    {
        private readonly List<QueryProcessor> _queriesList;
        private readonly SqlConnection _sqlConnection;

        public PipelineExecutor(string connectionString, Pipeline pipeline)
        {
            _queriesList = PipelineInterpreter.GetQueriesList(pipeline).ToList();
            _sqlConnection = new SqlConnection(connectionString);
        }

        public void Execute(string startingDatasetName, string destinationDatasetName)
        {
            string startingTempTableName;
            var endingTempTableName = "";

            if (_queriesList == null || _queriesList.Count == 0)
            {
                try
                {
                    _sqlConnection.SendQuery($"DROP TABLE {destinationDatasetName}");
                }
                catch (Exception)
                {
                    // ignored
                }
                _sqlConnection.SendQuery("SELECT * " +
                                         $"INTO {destinationDatasetName} " +
                                         $"FROM {startingDatasetName} ");
                return;
            }

            foreach (var query in _queriesList)
            {
                startingTempTableName = query == _queriesList[0] ? startingDatasetName : endingTempTableName;
                endingTempTableName = query == _queriesList[^1]
                    ? destinationDatasetName
                    : "#" + Guid.NewGuid().ToString("n");

                query.Handle(_sqlConnection, startingTempTableName, endingTempTableName);
            }
        }
    }
}