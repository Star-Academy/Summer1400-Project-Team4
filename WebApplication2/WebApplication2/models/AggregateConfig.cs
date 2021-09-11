using System;
using System.Linq;

namespace WebApplication2.models
{
    public class AggregateConfig
    {
        public string[] GroupBy { get; set; }
        public AggregateOperation[] Operations { get; set; }

        public string GetGroupBySqlCommands()
        {
            return string.Join(", ", GroupBy);
        }

        public string GetAggregateOperationSqlCommands()
        {
            return string.Join(", ", Operations.Select(o => o.ToString()));
        }
    }
}