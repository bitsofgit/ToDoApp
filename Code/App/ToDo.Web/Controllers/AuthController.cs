using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ToDo.Web.Data;
using ToDo.Web.Filters;
using ToDo.Web.ViewModels;

namespace ToDo.Web.Controllers
{
    public class AuthController : Controller
    {
        private ToDoContext _context;
        private ILogger _logger;
        private SignInManager<AppUser> _signInMgr;

        public AuthController(ToDoContext ctx, SignInManager<AppUser> signInMgr, ILogger<AuthController> logger)
        {
            if (ctx == null)
                throw new NullReferenceException("ctx is null");
            _context = ctx;

            if (signInMgr == null)
                throw new NullReferenceException("signInMgr is null");
            _signInMgr = signInMgr;

            if (logger == null)
                throw new NullReferenceException("logger is null");
            _logger = logger;
        }

        [HttpPost("api/auth/login")]
        [ValidateModel]
        public async Task<IActionResult> Login([FromBody]CredentialModel creds)
        {
            try
            {
                var result = await _signInMgr.PasswordSignInAsync(creds.UserName, creds.Password, false, false);
                if (result.Succeeded) return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to login: {ex}");
                throw;
            }

            return BadRequest("Failed to login.");
        }
    }
}
