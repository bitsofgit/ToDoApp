using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ToDo.Web.Data
{
    public class ToDoContext : IdentityDbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
            //Database.Log = str => Debug.WriteLine(str);
            
        }

        public DbSet<Item> Items { get; set; }

        public DbSet<SubItem> SubItems { get; set; }

        public DbSet<Priority> Priorities { get; set; }

        public DbSet<AppUser> AppUsers { get; set; }

    }
}
