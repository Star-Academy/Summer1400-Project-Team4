using System.Collections.Generic;

namespace WebApplication2.models
{
    public class Pipeline
    {
        public int PipelineId { get; set; }
        public string PipelineName { get; set; }
        public IEnumerable<Process> Processes { get; set; }
    }
}