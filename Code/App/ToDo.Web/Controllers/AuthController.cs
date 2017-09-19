using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ToDo.Web.Data;
using ToDo.Web.Filters;
using ToDo.Web.Helpers;
using ToDo.Web.ViewModels;
using Microsoft.AspNetCore.Cors;

namespace ToDo.Web.Controllers
{
    [EnableCors("AllAllow")]
    public class AuthController : Controller
    {
        private ToDoContext _context;
        private ILogger _logger;
        private SignInManager<AppUser> _signInMgr;
        private UserManager<AppUser> _userMgr;
        private IPasswordHasher<AppUser> _hasher;
        private IConfigurationRoot _config;

        public AuthController(ToDoContext ctx,
            SignInManager<AppUser> signInMgr, // for cookie auth
            UserManager<AppUser> userMgr, // for token auth
            IPasswordHasher<AppUser> hasher, // for token auth
            IConfigurationRoot config,
            ILogger<AuthController> logger)
        {
            ctx.ExtIfNullThrowException("ctx is null.");
            _context = ctx;

            signInMgr.ExtIfNullThrowException("signInMgr is null.");
            _signInMgr = signInMgr;

            userMgr.ExtIfNullThrowException("userMgr is null.");
            _userMgr = userMgr;

            hasher.ExtIfNullThrowException("hasher is null.");
            _hasher = hasher;

            config.ExtIfNullThrowException("config is null.");
            _config = config;

            logger.ExtIfNullThrowException("logger is null.");
            _logger = logger;
        }

        // cookie auth
        [HttpPost("api/auth/login")]
        [ValidateModel]
        public async Task<IActionResult> Login([FromBody] CredentialModel creds)
        {
            try
            {
                var result = await _signInMgr.PasswordSignInAsync(creds.UserName, creds.Password, false, false);
                if (result.Succeeded) return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to login: {ex}");
            }

            return BadRequest("Failed to login.");
        }

        // token auth - login
        [HttpPost("api/auth/token")]
        [ValidateModel]
        public async Task<IActionResult> CreateToken([FromBody] CredentialModel creds)
        {
            try
            {
                var user = await _userMgr.FindByNameAsync(creds.UserName);
                if (user != null)
                {
                    if (_hasher.VerifyHashedPassword(user, user.PasswordHash, creds.Password) ==
                        PasswordVerificationResult.Success)
                    {
                        var userClaims = await _userMgr.GetClaimsAsync(user);
                        var claims = new[]
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.Email, user.Email),
                            new Claim(JwtRegisteredClaimNames.GivenName, user.NormalizedUserName)
                        }.Union(userClaims);

                        // secret
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                        var signInCreds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        // payload
                        var appToken = new JwtSecurityToken(
                            issuer: _config["Tokens:Issuer"],
                            audience: _config["Tokens:Audience"],
                            claims: claims,
                            expires: DateTime.UtcNow.AddMinutes(15),
                            signingCredentials: signInCreds
                        );

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(appToken),
                            expiration = appToken.ValidTo
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to create token: {ex}");
            }

            return BadRequest("Failed to generate token.");
        }

        // token auth - register
        [HttpPost("api/auth/register")]
        [ValidateModel]
        public async Task<IActionResult> Register([FromBody] CredentialModel creds)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(creds.UserName) || string.IsNullOrWhiteSpace(creds.Password) || string.IsNullOrWhiteSpace(creds.Email))
                {
                    return BadRequest("Username or Password or Email can't be null, empty or have whitespace");
                }

                var user = await _userMgr.FindByNameAsync(creds.UserName);
                if (user == null)
                {
                    if (ValidatePassword(creds.Password) && ValidateEmail(creds.Email))
                    {
                        var appuser = new AppUser()
                        {
                            UserName = creds.UserName,
                            Email = creds.Email,
                            CreatedDate = DateTime.Now
                        };

                        var userResult = await _userMgr.CreateAsync(appuser, creds.Password);

                        if (userResult.Succeeded)
                            return Ok(new {Message = "Registration Successful" });
                        else
                            return BadRequest("Unable to process request.");
                    }
                    else
                        return BadRequest("Password or Email doesn't match criteria.");
                }
                else
                    return BadRequest("Unable to process request.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Unable to register user: {ex}");
            }

            return BadRequest("Unable to register user.");
        }

        private bool ValidateEmail(string email)
        {
            return true;
        }

        private bool ValidatePassword(string pswd)
        {
            return true;
        }
    }
}
