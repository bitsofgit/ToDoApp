using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Web.Data
{
    public class SubItem
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public Item Item { get; set; }
        public int ItemId { get; set; }

    }
}
