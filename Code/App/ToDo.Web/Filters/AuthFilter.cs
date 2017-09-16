using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using ToDo.Web.Data;
using ToDo.Web.Helpers;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace ToDo.Web.Filters
{
    public class AuthFilter : IAsyncAuthorizationFilter
    {
        private ILogger<TimingActionFilter> _logger;
        private UserManager<AppUser> _userMgr;

        public AuthFilter(ILogger<TimingActionFilter> logger, UserManager<AppUser> userMgr)
        {
            logger.ExtIfNullThrowException("logger is null");
            _logger = logger;

            userMgr.ExtIfNullThrowException("userMgr is null");
            _userMgr = userMgr;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            try
            {
                AppUser appUser = null;
                var desc = context.ActionDescriptor as ControllerActionDescriptor;
                if (desc.ControllerName.ToUpper() == "AUTH" || desc.ControllerName.ToUpper() == "TODO") return;

                var sub = @"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
                var subClaim = context.HttpContext.User.Claims.Where(c => c.Type == sub).FirstOrDefault();

                if (subClaim != null && !string.IsNullOrWhiteSpace(subClaim.Value))
                    appUser = await _userMgr.FindByNameAsync(subClaim.Value);

                //var appUser = await _userMgr.GetUserAsync(context.HttpContext.User);
                

                if (appUser == null)
                {
                    context.Result = new ForbidResult();
                    //context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    //return Json(new { message = "Unable to get user" });
                }
                else
                {
                    context.RouteData.Values.Add("AppUser", appUser);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to get app user. {ex}");
                throw;
            }
        }
    }
}
