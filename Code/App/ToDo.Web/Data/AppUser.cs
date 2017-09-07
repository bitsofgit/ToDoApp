using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDo.Web.Data
{
    public class AppUser : IdentityUser
    {
        [Required]
        public DateTime CreatedDate { get; set; }
    }
}
