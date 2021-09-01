using System.Collections.Generic;
using WebApplication2.Services.QueryServices;

namespace WebApplication2.Services
{
    public class PiplineExecuter
    {
        public object DataTable { get; set; }
        public List<QueryProcessor> QueriesList;
    }
}