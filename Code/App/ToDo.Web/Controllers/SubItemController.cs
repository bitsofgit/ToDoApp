using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ToDo.Web.Data;
using ToDo.Web.Repository;
using ToDo.Web.ViewModels;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ToDo.Web.Controllers
{
    [Route("api/[controller]")]
    public class SubItemController : Controller
    {
        private readonly IItemRepository _repo;

        public SubItemController(IItemRepository repo)
        {
            if (repo == null)
                throw new NullReferenceException("repo is null");

            this._repo = repo;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            if (_repo.DeleteSubItem(1, id))
            {
                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json(new { message = "subItem id " + id + " deleted successfully" });
            }

            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { message = "Unable to delete subItem with id " + id });
        }

        // POST api/subitem
        [HttpPost]
        public JsonResult Post([FromBody] SubItemVM vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    SubItem subItem = Mapper.Map<SubItem>(vm);

                    var addedSubItem = _repo.AddSubItem(1, subItem);
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
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "invalid subItem passed." });
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Unable to add subItem." });
            }

        }
    }
}
