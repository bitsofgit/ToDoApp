using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Web.ViewModels
{
    public class SubItemVM
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int ItemId { get; set; }
    }
}
