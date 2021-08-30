namespace WebApplication2.Services.QueryServices
{
    public abstract class IQueryProcessor
    {
        public abstract string Instruction { get; set; }
        public abstract void Handle();
    }
}