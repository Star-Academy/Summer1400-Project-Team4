namespace WebApi.models
{
    public class Connection
    {
        public int ConnectionId { get; set; }
        public int UserId { get; set; }
        public string ConnectionString { get; set; }

        public Connection(string host, string database)
        {
            ConnectionString = "Data Source=YourServerName;" + "Initial Catalog=YourDataBaseName;" + "User id=YourDBUserName;" + "Password=YourDBSecret;";
        }
    }
}