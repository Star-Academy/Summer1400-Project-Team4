#nullable enable
using System.Collections.Generic;

namespace WebApi.models.Table
{
    public class Row
    {
        public IEnumerable<string?> Data { set; get;  }
    }
}