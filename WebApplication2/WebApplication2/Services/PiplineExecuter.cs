using System.Collections.Generic;
using System.Linq;
using WebApplication2.Services.QueryServices;
using WebApplication2.Services.Sql;

namespace WebApplication2.Services
{
    public class PiplineExecuter
    {
        private SqlConnection SqlConnection;
        private List<QueryProcessor> QueriesList;

        public PiplineExecuter(string connectionString, string jsonPipeline)
        {
            QueriesList = JsonPipelineInterpreter.GetQueriesList(jsonPipeline).ToList();
            SqlConnection = new SqlConnection(connectionString);
        }
    }
}