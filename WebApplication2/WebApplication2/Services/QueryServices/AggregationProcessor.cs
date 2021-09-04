namespace WebApplication2.Services.QueryServices
{
    public class AggregationProcessor : QueryProcessor
    {
        public sealed override string Instruction { get; set; }

        public override void Handle()
        {
            throw new System.NotImplementedException();
        }

        public AggregationProcessor(string instruction)
        {
            Instruction = instruction;
        }
    }
}