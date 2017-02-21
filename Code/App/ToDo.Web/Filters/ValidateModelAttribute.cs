using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using ToDo.Web.Helpers;

namespace ToDo.Web.Filters
{
    // Instead of writing if model state is invalid then send a bad request in every action/controller
    // creating that attribute is cleaner.
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        private string _errorMessage;

        public ValidateModelAttribute(string errorMessage = null)
        {
            _errorMessage = errorMessage;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            if (!context.ModelState.IsValid)
            {
                if (string.IsNullOrWhiteSpace(_errorMessage))
                    context.Result = new BadRequestObjectResult(context.ModelState);
                else
                    context.Result = new BadRequestObjectResult(new { message = _errorMessage });
            }
        }
    }
}
