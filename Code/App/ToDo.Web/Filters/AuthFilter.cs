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
        private JWTHelper _jwtHelper;
        private ILogger<TimingActionFilter> _logger;
        private UserManager<AppUser> _userMgr;

        public AuthFilter(ILogger<TimingActionFilter> logger, UserManager<AppUser> userMgr, JWTHelper jwtHelper)
        {
            logger.ExtIfNullThrowException("logger is null");
            _logger = logger;
            
            userMgr.ExtIfNullThrowException("userMgr is null");
            _userMgr = userMgr;

            jwtHelper.ExtIfNullThrowException("jwtHelper is null");
            _jwtHelper = jwtHelper;
        }

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            try
            {
                var desc = context.ActionDescriptor as ControllerActionDescriptor;
                if (desc.ControllerName == "Auth") return;

                var appUser = await _jwtHelper.GetAppUser(context.HttpContext.User);

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
