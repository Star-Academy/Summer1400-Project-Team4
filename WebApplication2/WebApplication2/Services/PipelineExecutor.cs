using System.Collections.Generic;
using System.Linq;
using WebApplication2.Services.QueryServices;
using WebApplication2.Services.Sql;

namespace WebApplication2.Services
{
    public class PipelineExecutor
    {
        private SqlConnection SqlConnection;
        private List<QueryProcessor> QueriesList;

        public PipelineExecutor(string connectionString, string jsonPipeline)
        {
            QueriesList = JsonPipelineInterpreter.GetQueriesList(jsonPipeline).ToList();
            SqlConnection = new SqlConnection(connectionString);
        }

        public void Execute()
        {
            QueriesList.ForEach(query => query.Handle());
        }
    }
}