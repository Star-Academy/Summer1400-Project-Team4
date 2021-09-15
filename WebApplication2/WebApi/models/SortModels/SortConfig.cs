using System.Linq;

namespace WebApi.models.SortModels
{
    public class SortConfig
    {
        public SortOrder[] Orders { get; set; }

        public string GetFields()
        {
            return string.Join(", ", Orders.Select(o => o.GetSqlForm()));
        }
    }
}