namespace WebApplication2.Services.QueryServices
{
    public class JoinProcessor : QueryProcessor
    {
        public sealed override string Instruction { get; set; }

        public override void Handle()
        {
            throw new System.NotImplementedException();
        }

        public JoinProcessor(string instruction)
        {
            Instruction = instruction;
        }
    }
}