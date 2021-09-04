namespace WebApplication2.Services.QueryServices
{
    public class FilterProcessor : QueryProcessor
    {
        public sealed override string Instruction { get; set; }

        public override void Handle()
        {
            throw new System.NotImplementedException();
        }

        public FilterProcessor(string instruction)
        {
            Instruction = instruction;
        }
    }
}