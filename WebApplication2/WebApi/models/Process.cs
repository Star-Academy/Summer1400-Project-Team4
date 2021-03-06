using System.ComponentModel.DataAnnotations;

namespace WebApi.models
{
    public class Process
    {
        public int ProcessId { get; set; }
        public int NodeId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Inputs { get; set; }
        public string Position { get; set; }
        public string Instruction { get; set; }
    }
}