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
            foreach (var query in _queriesList)
            {
                query.Handle(_sqlConnection, startingDatasetName, destinationDatasetName);
            }
            // _queriesList.ForEach(query => query.Handle(_sqlConnection));
        }
    }
}