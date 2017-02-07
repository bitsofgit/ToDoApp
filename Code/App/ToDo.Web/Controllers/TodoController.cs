using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ToDo.Web.Data;
using ToDo.Web.Filters;
using ToDo.Web.Repository;
using ToDo.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.Web.Controllers
{
    [Authorize]
    [EnableCors("AllAllow")]
    [AddHeader("Author", "Akhil Deshpande @deshpandeakhil")]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly IItemRepository _repo;
        private IMemoryCache _memCache;
        private ILogger _logger;
        private UserManager<AppUser> _userMgr;

        public TodoController(IItemRepository repo, IMemoryCache memCache, ILogger<TodoController> logger, UserManager<AppUser> userMgr)
        {
            if (repo == null)
                throw new NullReferenceException("repo is null");
            _repo = repo;

            if (memCache == null)
                throw new NullReferenceException("memCache is null");
            _memCache = memCache;

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

        // GET api/Todo/GetPriority
        [HttpGet]
        [Route("GetPriority")]
        public JsonResult GetPriority()
        {
            var CACHEKEY = "PRIORITY_CACHE_KEY";
            try
            {
                IEnumerable<PriorityVM> results;
                if (_memCache.TryGetValue(CACHEKEY, out results))
                    return Json(results);

                var priorities = _repo.GetPriorities();
                results = Mapper.Map<IEnumerable<PriorityVM>>(priorities);

                // set some options for caching
                var opts = new MemoryCacheEntryOptions()
                {
                    SlidingExpiration = TimeSpan.FromHours(2)
                };

                _memCache.Set(CACHEKEY, results, opts);

                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in GetPriority: {ex}");
                throw;
            }
        }

        // GET api/Todo
        [HttpGet]
        public async Task<JsonResult> Get()
        {
            try
            {
                var appUser = await GetAppUser();
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                var items = _repo.GetAllItems(appUser.Id);
                var results = Mapper.Map<IEnumerable<ItemVM>>(items);
                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting priority: {ex}");
                throw;
            }
        }

        // GET api/Todo/5
        [HttpGet("{itemId}")]
        public async Task<JsonResult> Get(int itemId)
        {
            try
            {
                var appUser = await GetAppUser();
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                var item = _repo.GetItemById(appUser.Id, itemId);
                var result = Mapper.Map<ItemVM>(item);
                return Json(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while getting item by itemid: {ex}");
                throw;
            }
        }

        // POST api/Todo
        [HttpPost]
        [ValidateModel("Invalid item passed.")]
        public async Task<JsonResult> Post([FromBody] ItemVM vm)
        {
            try
            {
                var appUser = await GetAppUser();
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                Item item = Mapper.Map<Item>(vm);
                var addedItem = _repo.AddItem(appUser.Id, item);
                if (addedItem == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Unable to add item." });
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(Mapper.Map<ItemVM>(addedItem));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while adding item: {ex}");
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(new { message = "Unable to add item." });
            }
        }

        // PUT api/Todo/5
        [HttpPut("{itemId}")]
        [ValidateModel("Invalid item passed.")]
        public async Task<JsonResult> Put(int itemId, [FromBody] ItemVM vm)
        {
            try
            {
                var appUser = await GetAppUser();
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                Item newItem = Mapper.Map<Item>(vm);

                var updatedItem = _repo.UpdateItem(appUser.Id, itemId, newItem);
                if (updatedItem == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Unable to update item " + itemId });
                }
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(Mapper.Map<ItemVM>(updatedItem));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while updating item: {ex}");
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Unable to update item. " + itemId });
            }

        }

        /*
         * Many REST services support both PUT and PATCH methods. PATCH method is similar to PUT, but PUT will 
         * overwrite everything and put null values if some fields in the input JSON are missing, while PATCH will 
         * update only those fields that are provided in JSON. Code for PATCH might look like the following code: 
         */
        // PATCH api/Todo
        [HttpPatch]
        public async Task Patch(int id)
        {

        }

        // DELETE api/Todo/5
        [HttpDelete("{itemId}")]
        public async Task<JsonResult> Delete(int itemId)
        {
            try
            {
                var appUser = await GetAppUser();
                if (appUser == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    return Json(new { message = "Unable to get user" });
                }

                if (_repo.DeleteItem(appUser.Id, itemId))
                {
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(new { message = "item id " + itemId + " deleted successfully" });
                }

                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Unable to delete item with id " + itemId });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while deleting item: {ex}");
                throw;
            }

        }
    }
}
