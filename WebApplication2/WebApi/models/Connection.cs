using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Data.SqlClient;
using WebApi.Authentication;

namespace WebApi.models
{
    public class Connection
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ConnectionId { get; set; }

        [Required] public string ServerIp { get; set; }

        [Required] public string DbName { get; set; }
        [Required] public string DbUserName { get; set; }
        [Required] public string DbPassword { get; set; }

        public bool TestConnection()
        {
            var connectionString = $"Data Source=tcp:{ServerIp}1433;Initial Catalog={DbName};User ID={DbUserName};Password={DbPassword};";
            using var con = new SqlConnection(connectionString);
            try
            {
                con.Open();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}