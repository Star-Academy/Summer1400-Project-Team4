using System.Collections.Generic;

namespace WebApplication2.models
{
    public class User
    {
        public int UserId { get; set; }
        public IEnumerable<Pipeline> Pipelines { get; set; }
        public IEnumerable<Dataset> Datasets { get; set; }
    }
}