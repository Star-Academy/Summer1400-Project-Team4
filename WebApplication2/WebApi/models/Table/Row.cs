#nullable enable
using System.Collections.Generic;

namespace WebApi.models.Table
{
    public class Row
    {
        public Row(IEnumerable<string?> data)
        {
            Data = data;
        }

        public IEnumerable<string?> Data { set; get;  }
    }
} 