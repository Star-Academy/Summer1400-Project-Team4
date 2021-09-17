using System.Linq;

namespace WebApplication2.models
{
    public class AggregateConfig
    {
        public string[] groupBy { get; set; }
        public AggregateOperation[] operations { get; set; }

        public string GetGroupBySqlCommands()
        {
            return string.Join(", ", groupBy);
        }

        public string GetAggregateOperationSqlCommands()
        {
            return string.Join(", ", operations.Select(o => o.ToString()));
        }
    }
}