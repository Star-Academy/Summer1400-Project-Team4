using System;
using System.Collections.Generic;
using WebApplication2.Services.QueryServices;

namespace WebApplication2.Services
{
    public class PiplineExecuter
    {
        public Object DataTable { get; set; }
        public List<IQueryProcessor> QueriesList;
    }
}