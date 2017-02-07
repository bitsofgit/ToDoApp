using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDo.Web.Data;
using ToDo.Web.Repository;
using ToDo.Web.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using ToDo.Web.Filters;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.Web.Controllers
{
    [Authorize]
    [EnableCors("AllAllow")]
    [Route("api/[controller]")]
    public class SubItemController : Controller
    {
        private ILogger<SubItemController> _logger;
        private readonly IItemRepository _repo;
        private UserManager<AppUser> _userMgr;

        public SubItemController(IItemRepository repo, ILogger<SubItemController> logger, UserManager<AppUser> userMgr )
        {
            if (repo == null)
                throw new NullReferenceException("repo is null");
            _repo = repo;

            if (logger == null)
                throw new NullReferenceException("logger is null");
            _logger = logger;

            if (userMgr == null)
                throw new NullReferenceException("userMgr is null");
            _userMgr = userMgr;
        }

        private async Task<AppUser> GetAppUser()
        {
            return await _userMgr.FindByNameAsync(this.User.Identity.Name);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<JsonResult> Delete(int id)
        {
            try
            {
                var appUser = await GetAppUser() ;
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                if (_repo.DeleteSubItem(appUser.Id, id))
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(new { message = "subItem id " + id + " deleted successfully" });
                }

                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Unable to delete subItem with id " + id });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while deleting subitem: {ex}");
                throw;
            }
        }

        // POST api/subitem
        [HttpPost]
        [ValidateModel("Invalid subItem passed.")]
        public async Task<JsonResult> Post([FromBody] SubItemVM vm)
        {
            try
            {
                var appUser = await GetAppUser();
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                SubItem subItem = Mapper.Map<SubItem>(vm);

                var addedSubItem = _repo.AddSubItem(appUser.Id, subItem);
                if (addedSubItem == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Unable to add subItem." });
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(Mapper.Map<SubItemVM>(addedSubItem));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Exception while saving subitem: {ex}");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { message = "Unable to add subItem." });
            }
        }
    }
}
