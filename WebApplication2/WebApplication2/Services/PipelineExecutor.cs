using System.Collections.Generic;
using System.Linq;
using WebApplication2.Services.QueryServices;
using WebApplication2.Services.Sql;

namespace WebApplication2.Services
{
    public class PipelineExecutor
    {
        private readonly List<QueryProcessor> _queriesList;
        private readonly SqlConnection _sqlConnection;

        public PipelineExecutor(string connectionString, string jsonPipeline)
        {
            _queriesList = JsonPipelineInterpreter.GetQueriesList(jsonPipeline).ToList();
            _sqlConnection = new SqlConnection(connectionString);
        }

        public void Execute()
        {
            _queriesList.ForEach(query => query.Handle(_sqlConnection));
        }
    }
}