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
        public int OwnerId { get; set; }
        public int ConnectionId { get; set; }
        public string DatabaseName { get; set; }
        public string TableName { get; set; }
        public string CsvFile { get; set; }
        public bool AutoMap { get; set; }
        public bool DoesHaveHeader { get; set; }
        public bool IsLiked { get; set; }
        
    }
}