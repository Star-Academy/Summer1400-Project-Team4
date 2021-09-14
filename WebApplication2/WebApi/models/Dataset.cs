using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.models
{
    public class Dataset
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DatasetId { get; set; }
        public string DatasetName { get; set; }
        public bool IsLiked { get; set; }
        
        [NotMapped] public string token { get; set; }
        [NotMapped] public string DatabaseName { get; set; }
        [NotMapped] public string TableName { get; set; }
    }
}