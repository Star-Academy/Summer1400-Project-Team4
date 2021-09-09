namespace WebApplication2.Services.Sql
{
    public interface ISqlConnection
    {
        public void Initialize();
        public void SendQuery(string query);
    }
}