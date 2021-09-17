using System.ComponentModel.DataAnnotations;

namespace WebApi.models
{
    public class CsvProp
    {
        [Required] public string CsvContent { set; get; }
        [Required] public string DatasetName { set; get; }
        [Required] public bool DoesHaveHeader { set; get; }
        [Required] public bool DoesHaveAutoMap { set; get; }
        public string FieldTerminator { set; get; }
        public string RowTerminator { set; get; }
    }
}