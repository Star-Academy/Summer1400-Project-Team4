using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApi.models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

       [Required] public string Username { get; set; }
       [Required]public string Password { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        [JsonIgnore]public bool IsLoggedIn { get; set; }
        [JsonIgnore]public string Token { get; set; }
        [JsonIgnore]public string Avatar { get; set; }
        [JsonIgnore]public HashSet<Connection> UserConnections { get; set; }
        [JsonIgnore]public HashSet<Dataset> UserDatasets { get; set; }
    }
}