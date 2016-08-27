using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using ToDo.Web.Data;
using ToDo.Web.Filters;
using ToDo.Web.Repository;
using ToDo.Web.ViewModels;


// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.Web.Controllers
{
    [AddHeader("Author", "Akhil Deshpande @deshpandeakhil")]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly IItemRepository _repo;
        private IMemoryCache _memCache;

        public TodoController(IItemRepository repo, IMemoryCache memCache)
        {
            if (repo == null)
                throw new NullReferenceException("repo is null");
            this._repo = repo;

            if(memCache == null)
                throw new NullReferenceException("memCache is null");
            this._memCache = memCache;
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
                Helper.Log(ex.Message);
                throw;
            }
        }

        // GET api/Todo
        [HttpGet]
        public JsonResult Get()
        {
            try
            {
                var items = _repo.GetAllItems(1);
                var results = Mapper.Map<IEnumerable<ItemVM>>(items);
                return Json(results);
            }
            catch (Exception ex)
            {
                Helper.Log(ex.Message);
                throw;
            }
         
        }

        // GET api/Todo/5
        [HttpGet("{itemId}")]
        public JsonResult Get(int itemId)
        {
            var item = _repo.GetItemById(1, itemId);
            var result = Mapper.Map<ItemVM>(item);
            return Json(result);
        }

        // POST api/Todo
        [HttpPost]
        public JsonResult Post([FromBody] ItemVM vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Item item = Mapper.Map<Item>(vm);

                    var addedItem = _repo.AddItem(1, item);
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
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "invalid item passed." });
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Unable to add item." });
            }

        }

        // PUT api/Todo/5
        [HttpPut("{itemId}")]
        public JsonResult Put(int itemId, [FromBody] ItemVM vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Item newItem = Mapper.Map<Item>(vm);

                    var updatedItem = _repo.UpdateItem(1, itemId, newItem);
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
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "invalid item passed." });
                }
            }
            catch (Exception ex)
            {
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
        public JsonResult Delete(int itemId)
        {
            if (_repo.DeleteItem(1, itemId))
            {
                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(new { message = "item id " + itemId + " deleted successfully" });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { message = "Unable to delete item with id " + itemId });
        }
    }
}
