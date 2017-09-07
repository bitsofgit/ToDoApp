using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using ToDo.Web.Data;

namespace ToDo.Web.Helpers
{
    public class JWTHelper
    {
        private ILogger<JWTHelper> _logger;
        private UserManager<AppUser> _userMgr;

        public JWTHelper(UserManager<AppUser> userMgr, ILogger<JWTHelper> logger)
        {
            userMgr.ExtIfNullThrowException("userMgr is null");
            _userMgr = userMgr;

            logger.ExtIfNullThrowException("logger is null");
            _logger = logger;
        }

        //public async Task<AppUser> GetAppUser(ClaimsPrincipal user)
        //{
        //    try
        //    {
        //        return await _userMgr.GetUserAsync(user);

        //        //var sub = @"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
        //        //var subClaim = user.Claims.Where(c => c.Type == sub).FirstOrDefault();

        //        //if (subClaim != null && !string.IsNullOrWhiteSpace(subClaim.Value))
        //        //    appUser = await _userMgr.FindByNameAsync(subClaim.Value);

        //        //return appUser;
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Unable to get app user : {ex}");
        //        throw;
        //    }
        //}
    }
}
