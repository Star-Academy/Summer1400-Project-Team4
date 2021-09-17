using System.ComponentModel.DataAnnotations;

namespace WebApi.models
{
    public class PreviewData
    {
        [Required]public  int StartingIndex { get; set;  }
        [Required]public  int Size{ get; set;  }
    }
}