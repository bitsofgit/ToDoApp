using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Web.Data;

namespace ToDo.Web.ViewModels
{
    public class ItemVM
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Class { get; set; }
        public DateTime? CompletedOn { get; set; }
        public DateTime? DueBy { get; set; }
        public int? PriorityId { get; set; }
        public int Status { get; set; }
        public List<SubItemVM> SubItems { get; set; }


    }
}
