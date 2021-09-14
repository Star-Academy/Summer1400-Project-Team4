using System.Collections.Generic;

namespace WebApi.models
{
    public class Pipeline
    {
        public int PipelineId { get; set; }
        public string PipelineName { get; set; }
        public int InputDatasetId { get; set; }
        public int OutputDatasetId { get; set; }
        public string InputDataset { get; set; }
        public string OutputDataset { get; set; }
        public IEnumerable<Process> Processes { get; set; }
    }
}