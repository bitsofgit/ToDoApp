using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Security.Claims;

namespace ToDo.Web.Data
{
    public class IdentityInitializer
    {
        private RoleManager<IdentityRole> _roleMgr;
        private UserManager<AppUser> _userMgr;

        public IdentityInitializer(UserManager<AppUser> userMgr, RoleManager<IdentityRole> roleMgr)
        {
            if(userMgr == null)
                throw new NullReferenceException("userMgr is null");
            _userMgr = userMgr;

            if (roleMgr == null)
                throw new NullReferenceException("roleMgr is null");
            _roleMgr = roleMgr;
        }

        public async Task Seed()
        {
            var user = await _userMgr.FindByNameAsync("akhildeshpande");

            // Add User
            if (user == null)
            {
                if (!(await _roleMgr.RoleExistsAsync("Admin")))
                {
                    var role = new IdentityRole("Admin");
                    role.Claims.Add(new IdentityRoleClaim<string>() { ClaimType = "IsAdmin", ClaimValue = "True" });
                    await _roleMgr.CreateAsync(role);
                }

                user = new AppUser()
                {
                    UserName = "akhildeshpande",
                    Email = "ard@ard.com",
                    CreatedDate = DateTime.Now
                };

                var userResult = await _userMgr.CreateAsync(user, "P@ssw0rd!");
                var roleResult = await _userMgr.AddToRoleAsync(user, "Admin");
                var claimResult = await _userMgr.AddClaimAsync(user, new Claim("SuperUser", "True"));

                if (!userResult.Succeeded || !roleResult.Succeeded || !claimResult.Succeeded)
                {
                    throw new InvalidOperationException("Failed to build user and roles");
                }
            }
        }
    }
}
