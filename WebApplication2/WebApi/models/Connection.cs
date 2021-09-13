using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Data.SqlClient;
using WebApi.Authentication;

namespace WebApi.models
{
    public class Connection
    {
        [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string ConnectionId { get; set; }

        [Required] public int UserId { get; set; }
        [Required] public string ServerIp { get; }
        [Required] public string DbUserName { get; }
        [Required] public string DbPassword { get; }

        public Connection(string serverIp, string dbUserName, string dbPassword)
        {
            ServerIp = serverIp;
            DbUserName = dbUserName;
            DbPassword = dbPassword;
        }

        public bool TestConnection()
        {
            var connectionString = $"Data Source=tcp:{ServerIp}1433;User ID={UserId};Password={DbPassword};";
            using var con = new SqlConnection(connectionString);
            try
            {
                con.Open();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public void GenerateId()
        {
            ConnectionId = TokenCreator.GetNewToken(15);
        }
    }
}