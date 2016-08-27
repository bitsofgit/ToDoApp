using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Web.Data
{
    public class Item
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Class { get; set; }
        public DateTime? CompletedOn { get; set; }
        public DateTime DueBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int? PriorityId { get; set; }
        public Priority Priority { get; set; }
        public int? Status { get; set; }
        public List<SubItem> SubItems { get; set; }
    }
}
